export const chatTranscriptFormat = (chatArr) =>
  chatArr.map((msg) => `${msg.role}: ${msg.text}`).join('\n');
