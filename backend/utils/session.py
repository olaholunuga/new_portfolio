import uuid
from datetime import datetime
from flask import session
def get_or_create_session():
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
        session['conversation_history'] = {}
        session['visitor_type'] = None
        session['created_at'] = datetime.now().isoformat()
    return session['session_id']

def add_to_history(agent_name, user_message, ai_response):
    get_or_create_session()
    if agent_name not in session['conversation_history']:
        session['conversation_history'][agent_name] = []
    session['conversation_history'][agent_name].append({
        'user': user_message,
        'ai': ai_response,
        'timestamp': datetime.now().isoformat()
    })

def get_conversation_context(agent_name, limit=3):
    if agent_name in session.get('conversation_history', {}):
        recent = session['conversation_history'][agent_name][-limit:]
        return " | ".join([f"User: {c['user']} AI: {c['ai']}" for c in recent])
    return None