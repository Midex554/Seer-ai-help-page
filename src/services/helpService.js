import { articles } from "../data/helpData";

export const helpService = {
  searchArticles(query, categoryId) {
    const value = query.toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(value) ||
        article.summary.toLowerCase().includes(value) ||
        article.body.toLowerCase().includes(value) ||
        article.tags.some((tag) => tag.toLowerCase().includes(value));

      const matchesCategory =
        categoryId === "all" || article.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  },

  createTicket(data) {
    return {
      id: `SEAR-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      ...data,
    };
  },

  getAiReply(message) {
    const text = message.toLowerCase();

    if (text.includes("password")) {
      return "You can reset your password from the login page. Click 'Forgot Password', enter your email, then follow the reset link.";
    }

    if (
      text.includes("not responding") ||
      text.includes("error") ||
      text.includes("slow")
    ) {
      return "Try refreshing the page, checking your internet connection, and confirming system status. If it continues, I can connect you to a human support agent.";
    }

    if (text.includes("prompt")) {
      return "For better prompts, describe the task clearly, add context, specify the format, and mention your expected result.";
    }

    if (text.includes("billing") || text.includes("payment")) {
      return "For billing issues, check your subscription page, invoice history, and payment method. You can also create a ticket for payment review.";
    }

    return "I understand. I found some related help articles, but if this does not solve it, you can connect to a human support agent.";
  },
};
