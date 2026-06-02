import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Bot,
  MessageCircle,
  Send,
  X,
  ArrowRight,
  CheckCircle,
  Headphones,
  Globe,
  Mail,
  Bookmark,
  UserRound,
  Clock,
  ShieldCheck,
  Sparkles,
  Ticket,
  ThumbsUp,
  ThumbsDown,
  Wifi,
  Activity,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { categories, quickActions } from "../data/helpData";

import { helpApiService } from "../services/helpApiService";

import { createChatSocket } from "../services/chatSocket";

export default function HelpCenter() {
  const [backendArticles, setBackendArticles] = useState([
    {
      id: 1,
      categoryId: "account-security",
      title: "How to reset your password",
      summary: "Use forgot password to recover your account.",
      body: "Go to login, click forgot password, enter your email, and follow the reset link.",
      tags: ["password", "login", "security"],
    },
    {
      id: 2,
      categoryId: "troubleshooting",
      title: "Sear AI is not responding",
      summary: "Fix slow or failed AI response.",
      body: "Check internet, refresh the page, and confirm system status.",
      tags: ["error", "slow", "not responding"],
    },
  ]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const [selectedArticle, setSelectedArticle] = useState(null);

  const [savedArticles, setSavedArticles] = useState([]);

  const [chatOpen, setChatOpen] = useState(false);

  const [supportOpen, setSupportOpen] = useState(false);

  const [ticketInfo, setTicketInfo] = useState(null);

  const [message, setMessage] = useState("");

  const [socket, setSocket] = useState(null);

  const [chatSession, setChatSession] = useState(null);

  const [agentConnected, setAgentConnected] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hi, I’m Sear AI Support. Ask me anything or connect to a human support agent.",
    },
  ]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await helpApiService.getArticles();
        setBackendArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const value = query.trim().toLowerCase();

    return backendArticles.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const summary = article.summary?.toLowerCase() || "";
      const body = article.body?.toLowerCase() || "";
      const tags = article.tags || [];

      const matchesSearch =
        !value ||
        title.includes(value) ||
        summary.includes(value) ||
        body.includes(value) ||
        tags.some((tag) => tag.toLowerCase().includes(value));

      const matchesCategory =
        categoryId === "all" || article.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [query, categoryId, backendArticles]);
  useEffect(() => {
    if (query.trim().length > 0) {
      document.getElementById("articles")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [query]);

  const saveArticle = (article) => {
    const exists = savedArticles.some((item) => item.id === article.id);

    if (!exists) {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (socket && chatSession) {
      socket.send(
        JSON.stringify({
          sender: "user",
          senderName: "Demo User",
          message,
        }),
      );

      setMessage("");
      return;
    }

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const reply = await helpApiService.getAiReply(message);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Could not connect to AI support server.",
        },
      ]);
    }

    setMessage("");
  };

  const connectHumanAgent = async () => {
    try {
      const session = await helpApiService.createChatSession({
        userId: "demo-user-001",
        userName: "Demo User",
        reason: "User requested support",
      });

      setChatSession(session);

      const ws = createChatSocket(session.sessionId);

      ws.onopen = () => {
        console.log("WebSocket connected");

        setChatMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "Connected to support server. Waiting for agent...",
          },
        ]);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.sender === "agent") {
          setAgentConnected(true);
        }

        setChatMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            text: data.message,
          },
        ]);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      setSocket(ws);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `Chat session ${session.sessionId} created.`,
        },
      ]);
    } catch (error) {
      console.error(error);

      alert("Failed to connect to support agent.");
    }
  };

  const createTicket = async (formData) => {
    try {
      const ticket = await helpApiService.createTicket({
        userId: "demo-user-001",
        subject: formData.subject,
        priority: formData.priority,
        message: formData.message,
      });

      setTicketInfo(ticket);

      setSupportOpen(false);

      setChatOpen(true);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `Ticket ${ticket.id} created successfully.`,
        },
      ]);
    } catch (error) {
      console.error(error);

      alert("Ticket creation failed.");
    }
  };

  return (
    <div className="page">
      <div className="bg-blur bg-one"></div>
      <div className="bg-blur bg-two"></div>

      <nav className="navbar">
        <div className="logo">
          <div className="logo-mark">✦</div>
          <span>SEAR AI</span>
        </div>

        <div className="nav-links">
          <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Home
          </a>

          <a
            onClick={() =>
              document
                .getElementById("articles")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Articles
          </a>

          <a
            onClick={() =>
              document
                .getElementById("diagnostics")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Diagnostics
          </a>

          <a onClick={() => setSupportOpen(true)}>Support</a>
        </div>

        <div className="nav-actions">
          <span className="status-dot"></span>
          <span>Online</span>

          <button onClick={() => setChatOpen(true)}>
            Ask Sear AI <MessageCircle size={16} />
          </button>
        </div>
      </nav>

      <section className="hero">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="ai-badge">
            <Sparkles size={16} />
            AI Help Center
          </div>

          <h1>
            Support that feels <span>intelligent.</span>
          </h1>

          <p>
            Search help articles, ask Sear AI, create tickets, and connect with
            real support agents.
          </p>

          <div className="search-box">
            {query.trim() && (
              <div className="search-preview">
                <p>
                  Showing results for <strong>{query}</strong>
                </p>

                {filteredArticles.slice(0, 3).map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            )}
            <Search />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search password, billing, dashboard..."
            />
          </div>

          <div className="quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  onClick={() => {
                    setChatOpen(true);
                    setMessage(action.message);
                  }}
                >
                  <Icon size={16} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="ai-orbit"
          animate={{ rotate: 360 }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="planet">
            <Bot size={54} />
          </div>

          <div className="orbit-icon icon-one">
            <Ticket />
          </div>

          <div className="orbit-icon icon-two">
            <MessageCircle />
          </div>

          <div className="orbit-icon icon-three">
            <ShieldCheck />
          </div>
        </motion.div>
      </section>

      <main className="content">
        <section className="left">
          <div className="panel">
            <div className="section-header">
              <h2>Help Categories</h2>

              <a onClick={() => setCategoryId("all")}>
                View all <ArrowRight size={16} />
              </a>
            </div>

            <div className="category-grid">
              {categories.map((category, index) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    key={category.id}
                    className={`category-card ${
                      categoryId === category.id ? "active-card" : ""
                    }`}
                    onClick={() => setCategoryId(category.id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="card-icon">
                      <Icon />
                    </div>

                    <h3>{category.title}</h3>

                    <p>{category.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="panel articles-panel" id="articles">
            <div className="section-header">
              <h2>Recommended Articles</h2>

              <span className="article-count">
                {filteredArticles.length} result(s)
              </span>
            </div>

            <div className="article-results">
              {loadingArticles && (
                <p className="empty-text">Loading articles...</p>
              )}

              {!loadingArticles &&
                filteredArticles.map((article) => (
                  <motion.div
                    className="result-card"
                    key={article.id}
                    whileHover={{ x: 8 }}
                  >
                    <div onClick={() => setSelectedArticle(article)}>
                      <h3>{article.title}</h3>
                      <p>{article.summary}</p>
                    </div>

                    <button
                      className="icon-btn"
                      onClick={() => saveArticle(article)}
                    >
                      <Bookmark size={17} />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="panel ai-diagnostics" id="diagnostics">
            <div className="section-header">
              <h2>AI Diagnostics</h2>
            </div>

            <div className="diagnostic-grid">
              <DiagnosticCard
                icon={<Wifi />}
                title="Connection"
                text="Check network and service status."
              />

              <DiagnosticCard
                icon={<Activity />}
                title="AI Response"
                text="Check AI response performance."
              />

              <DiagnosticCard
                icon={<ShieldCheck />}
                title="Security"
                text="Check account safety."
              />
            </div>
          </div>

          <motion.div className="support-card">
            <div className="support-visual">
              <Headphones size={70} />
            </div>

            <div>
              <h2>Need human support?</h2>

              <p>
                Connect with a live support agent if AI cannot solve your issue.
              </p>

              {ticketInfo && (
                <p className="ticket">Current Ticket: {ticketInfo.id}</p>
              )}
            </div>

            <div className="support-actions">
              <button className="primary" onClick={() => setSupportOpen(true)}>
                Create Ticket <Ticket size={18} />
              </button>

              <button className="secondary" onClick={() => setChatOpen(true)}>
                Open Chat <MessageCircle size={18} />
              </button>
            </div>
          </motion.div>
        </section>

        <aside className="right">
          <div className="panel status-panel">
            <h2>Live Status</h2>

            <div className="system-ok">
              <CheckCircle />

              <div>
                <strong>All systems operational</strong>
                <p>AI engine and support are online.</p>
              </div>
            </div>

            <hr />

            <h2>Saved Articles</h2>

            <div className="article-list">
              {savedArticles.length ? (
                savedArticles.map((item) => (
                  <div
                    className="article"
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                  >
                    <Bookmark size={16} />
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="empty-text">No saved articles.</p>
              )}
            </div>
          </div>
        </aside>
      </main>

      <footer>
        <div>
          <div className="logo footer-logo">
            <div className="logo-mark">✦</div>
            <span>SEAR AI</span>
          </div>

          <p>Professional AI support center built for real-time integration.</p>

          <div className="socials">
            <Globe />
            <Mail onClick={() => setSupportOpen(true)} />
            <MessageCircle onClick={() => setChatOpen(true)} />
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onSave={() => saveArticle(selectedArticle)}
          />
        )}

        {supportOpen && (
          <SupportModal
            onClose={() => setSupportOpen(false)}
            onSubmit={createTicket}
          />
        )}

        {chatOpen && (
          <ChatWidget
            messages={chatMessages}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            onClose={() => setChatOpen(false)}
            connectHumanAgent={connectHumanAgent}
            agentConnected={agentConnected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DiagnosticCard({ icon, title, text }) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>

      <button onClick={() => alert(`${title} check completed`)}>
        Run Check
      </button>
    </div>
  );
}

function ArticleModal({ article, onClose, onSave }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>{article.title}</h2>

        <span>{article.categoryId}</span>

        <p>{article.body}</p>

        <div className="modal-actions">
          <button onClick={onSave}>
            <Bookmark size={16} />
            Save
          </button>

          <button onClick={() => setFeedback("Thanks for your feedback")}>
            <ThumbsUp size={16} />
            Helpful
          </button>

          <button onClick={() => setFeedback("We will improve this article")}>
            <ThumbsDown size={16} />
            Not Helpful
          </button>
        </div>

        {feedback && <p className="feedback-text">{feedback}</p>}
      </motion.div>
    </div>
  );
}

function SupportModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    subject: "",
    priority: "Medium",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Create Support Ticket</h2>

        <form className="support-form" onSubmit={submit}>
          <input
            placeholder="Issue subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <textarea
            placeholder="Explain the issue..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          <button className="primary">Submit Ticket</button>
        </form>
      </motion.div>
    </div>
  );
}

function ChatWidget({
  messages,
  message,
  setMessage,
  sendMessage,
  onClose,
  connectHumanAgent,
  agentConnected,
}) {
  return (
    <motion.div
      className="chat-box"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="chat-header">
        <div>
          <strong>Sear AI Chat</strong>

          <p>
            {agentConnected ? "Human support connected" : "AI assistant online"}
          </p>
        </div>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-tools">
        <button onClick={connectHumanAgent}>
          <UserRound size={14} />

          {agentConnected ? "Agent Connected" : "Connect Human Agent"}
        </button>

        <button>
          <Clock size={14} />
          Save Chat
        </button>
      </div>

      <div className="chat-input">
        <input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );
}
