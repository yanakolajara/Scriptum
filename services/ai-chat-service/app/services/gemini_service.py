import json
from app.config import Config
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions

# todo: Add error handling 

def genai_message(message = "", history = []):
  client = genai.Client(api_key = Config.GENAI_KEY)
  # todo: add settings

  # setup chat model with or without chat history
  chat = client.chats.create(model = "gemini-2.5-flash", history = history)
  response = chat.send_message(message)
  return response.text


def genai_generate_summary(chat):
  # todo: Add summary prompt as instruction

  # setup model with summary instructions
  client = genai.Client(api_key = Config.GENAI_KEY)
  # send request with chat attatch as content
  response = client.models.generate_content(model="gemini-2.5-flash", config=GenerateContentConfig(
        system_instruction="""
Based on our conversation so far, generate a coherent and well-written summary in a single paragraph.
Write it in the first person, as if I were writing it myself for my diary.
This summary should capture the key events and feelings I have shared.
Start the summary with a phrase like 'Today was a day when...' or similar.
Do not include any introduction or comments of your own, only the text of the summary.
"""
    ), contents = chat)
  # get text from response
  return response.text
  pass


def genai_request(message, instructions = ""):
  # setup model with custom instructions
  client = genai.Client(api_key=Config.GENAI_KEY)
  # todo: add settings
  response = client.models.generate_content(model="gemini-2.5-flash", contents=message)
  return response
