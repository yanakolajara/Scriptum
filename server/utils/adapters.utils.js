export const formatChat = (chat) => {
  return chat.map((message) => {
    return `${message.role}: ${message.parts[0].text}`;
  });
};
