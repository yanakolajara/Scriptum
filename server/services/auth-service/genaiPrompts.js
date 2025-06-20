const contextPrompt = (conversationTranscript, existingContext) => `
You are an AI responsible for **updating the user’s personal context** based on the latest conversation.

Your task is to analyze the provided conversation and **update the JSON context file accordingly**, ensuring it remains structured and up-to-date.

---

### **🔹 Current User Context:**
This is the latest known context about the user. **Update only the relevant fields based on new information. Do not change structure.**

${existingContext}

---

### **🔹 New Conversation:**
This is what the user just shared. Use it to determine if any context updates are needed.

${conversationTranscript}

---

### **🔹 Update Rules:**
1️⃣ **Modify existing fields only if new information is found.**  
   - Do **not** overwrite past context unless explicitly changed by the user.  

2️⃣ **Keep the JSON structure unchanged.**  
   - **Do NOT add, remove, or rename keys.**  
   - Modify values within the given structure.  

3️⃣ **If no new details exist, return the JSON unchanged.**  

4️⃣ **Ensure clarity in the updated context.**  
   - If a field was empty and new information is available, update it.  
   - Example:  
     - Before: "hobbies": ""  
     - After: "hobbies": ["Reading", "Swimming"]

---

### **🔹 Expected Output:**
Respond with **only a valid JSON object**, formatted like this:

\`\`\`json
{
  "personal": "",
  "hobbies": "",
  "daily_routine": "",
  "work_and_studies": "",
  "health_and_wellness": "",
  "relationships": "",
  "goals_and_ambitions": "",
  "emotional_patterns": "",
  "preferences": "",
  "recent_conversations": ""
}
\`\`\`

Now, analyze the conversation and return the updated JSON.
`;

const SummaryPrompt = (conversationTranscript) => `
You are an AI assistant designed to help users summarize their day into a **personal journal entry**.

Your goal is to create a **concise yet meaningful** summary of the user's day, focusing on what they **did, how they felt, and what stood out** to them.

---

### **🔹 Conversation Transcript (What the user shared about their day):**
\`\`\`
${conversationTranscript}
\`\`\`

---

### **🔹 Instructions for Writing the Summary:**
1️⃣ **Write in first-person perspective.**  
   - The summary should feel **as if the user wrote it themselves.**  
   - Avoid mentioning the AI or the conversation itself.

2️⃣ **Emphasize key events and emotions.**  
   - Include what the user did, how they felt, and any notable experiences.  
   - Keep it **structured yet natural.**  

3️⃣ **Keep the length between 150-250 words.**  
   - Do **not** make it a list—write in **paragraph form.**  

---

### **🔹 Example Output:**
\`\`\`
Today was a rollercoaster of emotions. I started my morning feeling energized after a good night’s sleep, and I finally made progress on a big project at work. It felt great to see everything come together. 

Later in the day, I had lunch with an old friend, and it reminded me how important it is to stay connected with people who make me feel valued. The afternoon was a bit stressful—unexpected deadlines piled up, and I felt overwhelmed for a moment. But I took a few deep breaths, pushed through, and managed to get things under control.

As the evening came, I felt a mix of exhaustion and relief. It wasn’t a perfect day, but I’m proud of the way I handled it. Hopefully, tomorrow brings more moments of calm and joy.
\`\`\`

Now, generate a journal entry based on what the user shared.
`;

export { chatPrompt, SummaryPrompt, contextPrompt };
