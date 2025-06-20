from flask import Blueprint, jsonify, request, json
from app.services.gemini_service import  genai_message, genai_generate_summary, genai_request

api_bp = Blueprint('/', __name__)

@api_bp.route('/', methods=['GET'])
def index():
  message = "Welcome to scriptum genai service!"
  return jsonify({"message": message})

@api_bp.route('/start-chat', methods=['GET'])
def start_chat():
  chat = genai_start_chat()
  return jsonify({"chatInstance": chat})

@api_bp.route('/send-message', methods=['POST'])
def send_message():
  data = json.loads(request.data)
  message = data.get("message", "no message")
  history = data.get("history", [])
  response = genai_message(message, history)
  return jsonify({"message": response})