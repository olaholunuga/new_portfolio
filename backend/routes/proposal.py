from flask import Blueprint, request, jsonify, session
from datetime import datetime
import json
from agents import TechnicalAgent

proposal_bp = Blueprint("proposal", __name__)

@proposal_bp.route("/api/generate_proposal", methods=["POST"])
def generate_proposal():
    data = request.get_json()
    requirements = data.get("requirements")
    visitor_info = data.get("visitor_info", {})
    if not visitor_info:
        visitor_info = session.get("visitor_type", "client or employer")

    if not requirements:
        return jsonify({"error": "Requirements are required"}), 400
    

    technical_agent = TechnicalAgent()
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
    """

    proposal = technical_agent.get_response(proposal_prompt)
    return jsonify({
        "proposal": proposal,
        "generated_at": datetime.now().isoformat()
    })