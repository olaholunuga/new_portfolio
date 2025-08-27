import json
from agents.base import BaseAgent
from flask import current_app


class TechnicalAgent(BaseAgent):
    def __init__(self):
        content_data = current_app.content_data if current_app else {}
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
        super().__init__("Technical", "Project Expert", system_prompt)
    def build_prompt(self, message, context=None, visitor_type=None):
        prompt = f"User message: {message}"
        if visitor_type:
            prompt += f"\nVisitor type: {visitor_type}"
        if context:
            prompt += f"\nConversation context: {context}"
        if any(word in message.lower() for word in ['commerce', 'task', 'analytics', 'social', 'ai', 'real estate']):
            prompt += "\nThe user is asking about a specific project. Provide detailed technical infomation"
        return prompt