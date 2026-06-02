import api from "../api/api";

export const helpApiService = {
  getArticles: async () => {
    const res = await api.get("/help/articles");
    return res.data;
  },

  getAiReply: async (message) => {
    const res = await api.post("/ai/reply", { message });
    return res.data.reply;
  },

  createTicket: async (ticketData) => {
    const res = await api.post("/tickets", ticketData);
    return res.data;
  },
  createChatSession: async (data) => {
    const res = await api.post("/chat/session", data);
    return res.data;
  },
};
