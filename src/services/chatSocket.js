export const createChatSocket = (sessionId) => {
  return new WebSocket(`ws://127.0.0.1:8000/ws/chat/${sessionId}`);
};
