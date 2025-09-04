from flask import Flask
from flask_cors import CORS
import logging
import os
from config import Config
from routes import register_routes
from utils.content_loader import load_content

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)

    # Load content globally
    app.content_data = load_content()

    # Register all routes
    register_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT"), 5000))
