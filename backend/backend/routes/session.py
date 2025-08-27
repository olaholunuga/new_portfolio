from flask import Blueprint, session, jsonify
from utils.session import get_or_create_session

session_bp = Blueprint("session", __name__)

@session_bp.route("/api/session_info", methods=["GET"])
def session_info():
    session_id = get_or_create_session()
    return jsonify({
        "session_id": session_id,
        "visitor_type": session.get("visitor_type"),
        "conversation_count": len(session.get("conversation_history", {}))
    })