from flask import Blueprint, request, jsonify, session
from agents import RouterAgent, StorytellerAgent, TechnicalAgent
from utils.session import get_conversation_context, add_to_history, get_or_create_session
from utils.visitor import extract_visitor_type
import logging

chat_bp = Blueprint("chat", __name__)

agents: dict[RouterAgent | StorytellerAgent | TechnicalAgent] = {
    'router': RouterAgent(),
    'storyteller': StorytellerAgent(),
    'technical': TechnicalAgent()
}
logger = logging.getLogger(__name__)
@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    agent_type = data.get("agent_type", "router")

    if not message:
        return jsonify({"error": "Message is required"}), 400
    
    session_id = get_or_create_session()
    agent = agents.get(agent_type)
    if not agent:
        return jsonify({"error": "Invalid agent type"}), 400
    
    context = get_conversation_context(agent_type)
    visitor_type = session.get("visitor_type")

    ai_response = agent.get_response(message, context, visitor_type)

    if agent_type == 'router' and not visitor_type:
        visitor_type = extract_visitor_type(ai_response)
        if visitor_type:
            session["visitor_type"] = visitor_type
            logging.error("session visitor type stored")
    
    add_to_history(agent_type, message, ai_response)

    return jsonify({
        "message": ai_response,
        "agent": agent.name,
        "visitor_type": session.get("visitor_type"),
        "session_id": session_id
    })