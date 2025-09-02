from .chat import chat_bp
from .proposal import proposal_bp
from .session import session_bp
from .health import health_bp
from .Contact import contact_bp

def register_routes(app):
    app.register_blueprint(chat_bp)
    app.register_blueprint(proposal_bp)
    app.register_blueprint(session_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(contact_bp)