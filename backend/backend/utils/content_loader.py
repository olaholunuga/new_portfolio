import json
import logging

logger = logging.getLogger(__name__)

def load_content():
    try:
        with open('./data/content.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error("content file not found")
        return {}