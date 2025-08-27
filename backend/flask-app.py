# backend/app.py
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import os
import json
import uuid
from datetime import datetime
from groq import Groq
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')
CORS(app, supports_credentials=True)

# Initialize Groq client
groq_client = Groq(
    api_key=os.getenv('GROQ_API_KEY', 'your-groq-api-key')
)

# Load content data
def load_content():
    try:
        with open('data/content.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("Content file not found")
        return {}

content_data = load_content()

# AI Agent Classes
class BaseAgent:
    def __init__(self, name, role, system_prompt):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
    
    def get_response(self, message, context=None, visitor_type=None):
        try:
            # Prepare context-aware prompt
            full_prompt = self.build_prompt(message, context, visitor_type)
            
            # Call Groq API
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": full_prompt}
                ],
                model="llama-3.1-70b-versatile",  # Free tier model
                temperature=0.7,
                max_tokens=500
            )
            
            return chat_completion.choices[0].message.content
        except Exception as e:
            logger.error(f"Error getting AI response: {str(e)}")
            return "I'm having trouble responding right now. Please try again!"
    
    def build_prompt(self, message, context=None, visitor_type=None):
        prompt_parts = [f"User message: {message}"]
        
        if visitor_type:
            prompt_parts.append(f"Visitor type: {visitor_type}")
        
        if context:
            prompt_parts.append(f"Conversation context: {context}")
        
        return "\n\n".join(prompt_parts)

class RouterAgent(BaseAgent):
    def __init__(self):
        system_prompt = f"""You are a professional portfolio website assistant. Your role is to:

1. Greet visitors warmly and identify their purpose
2. Determine if they are a RECRUITER, CLIENT, or DEVELOPER
3. Guide them to the most relevant portfolio sections
4. Provide quick highlights of skills and experience

PORTFOLIO OWNER INFO:
- Name: Software Engineer
- Experience: 3+ years full-stack development
- Specialties: React, Next.js, Node.js, Python, Mobile apps
- Available for: Full-time roles and freelance projects

SECTIONS AVAILABLE:
- About: Detailed background, skills, and professional journey
- Projects: Technical project showcases with implementation details
- Contact: Direct communication for opportunities

VISITOR TYPES & RESPONSES:
- RECRUITER: Focus on skills, experience, availability, technical competency
- CLIENT: Focus on services offered, project outcomes, business value
- DEVELOPER: Focus on technical discussions, code quality, collaboration

Keep responses concise, professional, and engaging. Always ask clarifying questions to better understand their needs.
"""
        super().__init__("Router", "Navigation & Visitor Classification", system_prompt)
    
    def build_prompt(self, message, context=None, visitor_type=None):
        prompt = f"User message: {message}"
        
        if context:
            prompt += f"\n\nPrevious conversation: {context}"
        
        prompt += "\n\nDetermine the visitor type and guide them appropriately. If unclear, ask clarifying questions."
        
        return prompt

class StorytellerAgent(BaseAgent):
    def __init__(self):
        # Load personal data for context
        skills = content_data.get('skills', [])
        experience = content_data.get('experience', [])
        personal_story = content_data.get('personal_story', '')
        
        system_prompt = f"""You are a professional storyteller focused on sharing the portfolio owner's journey, skills, and experience.

PERSONAL STORY:
{personal_story}

TECHNICAL SKILLS:
{json.dumps(skills, indent=2)}

PROFESSIONAL EXPERIENCE:
{json.dumps(experience, indent=2)}

PERSONALITY TRAITS:
- Detail-oriented but big-picture minded
- Passionate about clean code and user experience
- Continuous learner and knowledge sharer
- Strong communicator and collaborator

Your role is to:
1. Tell engaging stories about the professional journey
2. Explain technical skills with real-world examples
3. Share work philosophy and approach to development
4. Highlight unique qualities and experiences
5. Adapt the story based on visitor type (recruiter/client/developer)

Keep responses personal, authentic, and focused on value delivered. Use specific examples and quantifiable achievements when possible.
"""
        super().__init__("Storyteller", "Personal Journey & Skills", system_prompt)

class TechnicalAgent(BaseAgent):
    def __init__(self):
        # Load projects data
        projects = content_data.get('projects', [])
        
        system_prompt = f"""You are a technical expert explaining project implementations, architectural decisions, and development approaches.

PROJECTS PORTFOLIO:
{json.dumps(projects, indent=2)}

TECHNICAL EXPERTISE:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python, Express, FastAPI
- Databases: PostgreSQL, MongoDB, Redis
- DevOps: AWS, Docker, CI/CD, Vercel
- Mobile: React Native, Flutter

Your role is to:
1. Explain technical implementations in detail
2. Discuss architectural decisions and trade-offs
3. Compare different approaches and technologies
4. Generate technical documentation
5. Provide code examples and best practices
6. Suggest solutions for visitor's technical challenges

RESPONSE STYLES BY VISITOR TYPE:
- RECRUITER: Focus on technical competency, problem-solving approach
- CLIENT: Focus on business value, scalability, reliability
- DEVELOPER: Focus on implementation details, code quality, best practices

Always provide specific examples from actual projects. Explain complex concepts clearly and offer to dive deeper into any aspect.
"""
        super().__init__("Technical", "Project Implementation & Architecture", system_prompt)
    
    def build_prompt(self, message, context=None, visitor_type=None):
        prompt = f"User message: {message}"
        
        if visitor_type:
            prompt += f"\nVisitor type: {visitor_type}"
            
        if context:
            prompt += f"\nConversation context: {context}"
        
        # Add specific project context if mentioned
        if any(project in message.lower() for project in ['ecommerce', 'task', 'analytics', 'social', 'ai', 'real estate']):
            prompt += "\nThe user is asking about a specific project. Provide detailed technical information."
        
        return prompt

# Initialize agents
agents = {
    'router': RouterAgent(),
    'storyteller': StorytellerAgent(), 
    'technical': TechnicalAgent()
}

# Session management
def get_or_create_session():
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
        session['conversation_history'] = {}
        session['visitor_type'] = None
        session['created_at'] = datetime.now().isoformat()
    return session['session_id']

def add_to_history(agent_name, user_message, ai_response):
    session_id = get_or_create_session()
    if agent_name not in session['conversation_history']:
        session['conversation_history'][agent_name] = []
    
    session['conversation_history'][agent_name].append({
        'user': user_message,
        'ai': ai_response,
        'timestamp': datetime.now().isoformat()
    })

def get_conversation_context(agent_name, limit=3):
    if agent_name in session.get('conversation_history', {}):
        recent_conversations = session['conversation_history'][agent_name][-limit:]
        return " | ".join([f"User: {conv['user']} AI: {conv['ai']}" for conv in recent_conversations])
    return None
logger = logging.Get
# API Routes
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message')
        agent_type = data.get('agent_type', 'router')  # router, storyteller, technical
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        session_id = get_or_create_session()
        
        # Get the appropriate agent
        agent = agents.get(agent_type)
        if not agent:
            return jsonify({'error': 'Invalid agent type'}), 400
        
        # Get conversation context
        context = get_conversation_context(agent_type)
        visitor_type = session.get('visitor_type')
        
        # Get AI response
        ai_response = agent.get_response(message, context, visitor_type)
        
        # Extract visitor type from router agent if not set
        if agent_type == 'router' and not visitor_type:
            visitor_type = extract_visitor_type(ai_response)
            if visitor_type:
                session['visitor_type'] = visitor_type
        
        # Add to conversation history
        add_to_history(agent_type, message, ai_response)
        
        return jsonify({
            'message': ai_response,
            'agent': agent.name,
            'visitor_type': session.get('visitor_type'),
            'session_id': session_id
        })
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def extract_visitor_type(response):
    """Simple visitor type extraction from AI response"""
    response_lower = response.lower()
    if any(word in response_lower for word in ['recruiter', 'hiring', 'job', 'position']):
        return 'recruiter'
    elif any(word in response_lower for word in ['client', 'project', 'freelance', 'hire']):
        return 'client'
    elif any(word in response_lower for word in ['developer', 'engineer', 'technical', 'code']):
        return 'developer'
    return None

@app.route('/api/generate-proposal', methods=['POST'])
def generate_proposal():
    try:
        data = request.get_json()
        requirements = data.get('requirements')
        visitor_info = data.get('visitor_info', {})
        
        if not requirements:
            return jsonify({'error': 'Requirements are required'}), 400
        
        # Use technical agent to generate proposal
        technical_agent = agents['technical']
        
        proposal_prompt = f"""
        Generate a professional project proposal based on these requirements:
        
        REQUIREMENTS: {requirements}
        CLIENT INFO: {json.dumps(visitor_info)}
        
        Include:
        1. Project Overview
        2. Technical Approach
        3. Recommended Tech Stack
        4. Timeline Estimate
        5. Key Deliverables
        6. Next Steps
        
        Make it professional but personalized to their specific needs.
        """
        
        proposal = technical_agent.get_response(proposal_prompt)
        
        return jsonify({
            'proposal': proposal,
            'generated_at': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Proposal generation error: {str(e)}")
        return jsonify({'error': 'Failed to generate proposal'}), 500

@app.route('/api/session-info', methods=['GET'])
def session_info():
    session_id = get_or_create_session()
    return jsonify({
        'session_id': session_id,
        'visitor_type': session.get('visitor_type'),
        'conversation_count': len(session.get('conversation_history', {}))
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'agents': list(agents.keys()),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)