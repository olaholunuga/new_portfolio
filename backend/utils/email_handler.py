from flask import render_template
import resend
from datetime import datetime
import logging
from config import Config

logger = logging.getLogger(__name__)

resend.api_key = Config.RESEND_API_KEY

def send_email(to: str, subject: str, template_name: str, context: dict, text_body: str = None):
    """
    Send an email using Resend with a Jinja2 template.

    Args:
        to (str): Recipient email address
        subject (str): Email subject
        template_name (str): Jinja2 template file (e.g., 'email_proposal_owner.html')
        context (dict): Variables passed to template
        text_body (str, optional): Plain text fallback
    """
    # Add common context values (year, disclaimer toggle, etc.)
    context.setdefault("year", datetime.now().year)
    context.setdefault("disclaimer", context.get("disclaimer", None))

    html_body = render_template(template_name, **context)
    logger.error("reached here")

    try:
        emails = resend.Emails.send({
            "from": "Olaoluwa <noreply@olaoluwaolunuga.me>",  # replace with your domain
            "to": [to],
            "subject": subject,
            "html": html_body,
            "text": text_body or "Please view this email in an HTML-compatible client."
            })
        logger.error(f"Email sent response: {emails}")
    except Exception as e:
        logger.error(f"Resend Error: {str(e)}", exc_info=True)
