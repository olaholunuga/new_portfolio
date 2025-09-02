import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'YOUR_SECRET_KEY_HERE')
    GROQ_API_KEY = os.getenv('GROQ_API_KEY', 'groq-api-key')
    RESEND_API_KEY = os.getenv('RESEND_API_KEY')