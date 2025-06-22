export const generateEntry = async ({ conversation }) => {
  const gemini = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const entry = await gemini.models.generateContent({
    model: process.env.GEMINI_API_MODEL,
    systemInstruction: GenerateEntryInstruction({ conversation }),
  });

  return entry;
};

export const updateContext = async ({ conversation, userContext }) => {
  const gemini = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const context = await gemini.models.generateContent({
    model: process.env.GEMINI_API_MODEL,
    systemInstruction: ContextUpdatePrompt({ userContext, conversation }),
  });

  return context;
};
