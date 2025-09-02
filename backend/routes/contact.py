from flask import Blueprint, request, jsonify
from utils.email_handler import send_email

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/api/send-contact", methods=["POST"])
def send_contact():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        if not (name and email and subject and message):
            return jsonify({"error": "All fields are required"}), 400

        # Send to you (owner)
        send_email(
            to="your-email@example.com",
            subject=f"New Contact Message from {name}",
            template_name="email_contact_owner.html",
            context={
                "subject": subject,
                "name": name,
                "email": email,
                "message": message,
            },
        )

        # Confirmation to sender
        send_email(
            to=email,
            subject="We received your message",
            template_name="email_contact_client.html",
            context={
                "subject": subject,
                "name": name,
                "message": message,
            },
        )

        return jsonify({"status": "success"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500