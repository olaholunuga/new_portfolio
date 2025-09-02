import logging
from groq import Groq
from config import Config

logger = logging.getLogger(__name__)

groq_client = Groq(api_key=Config.GROQ_API_KEY)

class BaseAgent:
    def __init__(self, name, role, system_prompt):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
    
    def get_response(self, message, context=None, visitor_type=None):
        try:
            full_prompt = self.build_prompt(message, context, visitor_type)
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": full_prompt}
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.7,
                max_tokens=500
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            logger.error(f"Error getting AI response: {str(e)}")
            return "I'm having trouble responding right now, please try again"
    
    def build_prompt(self, message, context=None, visitor_type=None):
        prompt_parts = [f"User message: {message}"]
        if visitor_type:
            prompt_parts.append(f"Visitor Type: {visitor_type}")
        if context:
            prompt_parts.append(f"Converstional context: {context}")
        return "\n\n".join(prompt_parts)