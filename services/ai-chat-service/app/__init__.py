from flask import Flask
from .config import config_by_name

def create_app(config_name='development'):
  app = Flask(__name__)
  app.config.from_object(config_by_name[config_name])

  from .api.gemini_routes import api_bp

  app.register_blueprint(api_bp, url_prefix='/api')

  return app