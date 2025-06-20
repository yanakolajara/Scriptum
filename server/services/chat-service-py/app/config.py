import os
from dotenv import load_dotenv

load_dotenv()

class Config:
  GENAI_KEY = os.getenv('GENAI_KEY')

class DevelopmentConfig(Config):
  DEBUG = True

class ProductionConfig(Config):
  DEBUG = False

config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
