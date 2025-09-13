export const chatTranscriptFormat = (chatArr) =>
  chatArr.map((msg) => `${msg.role}: ${msg.parts[0].text}`).join('\n');
