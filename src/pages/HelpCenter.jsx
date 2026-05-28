import { useMemo, useState } from "react";
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
import { articles, categories, quickActions } from "../data/helpData";
import { helpService } from "../services/helpService";

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [agentRequested, setAgentRequested] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hi, I’m Sear AI Support. Search articles or ask me anything. If I cannot solve it, I can connect you to a human agent.",
    },
  ]);

  const filteredArticles = useMemo(() => {
    return helpService.searchArticles(query, categoryId);
  }, [query, categoryId]);

  const saveArticle = (article) => {
    const exists = savedArticles.some((item) => item.id === article.id);
    if (!exists) setSavedArticles([...savedArticles, article]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    const aiMessage = {
      sender: "ai",
      text: helpService.getAiReply(message),
    };

    setChatMessages((prev) => [...prev, userMessage, aiMessage]);
    setMessage("");
  };

  const requestAgent = () => {
    setAgentRequested(true);

    setChatMessages((prev) => [
      ...prev,
      {
        sender: "system",
        text: "Human agent requested. Waiting for an available support agent...",
      },
    ]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Hello, I’m Daniel from Sear AI Support. I’m connected now. Please explain the issue.",
        },
      ]);
    }, 1800);
  };

  const createTicket = (formData) => {
    const ticket = helpService.createTicket(formData);
    setTicketInfo(ticket);
    setSupportOpen(false);
    setChatOpen(true);

    setChatMessages((prev) => [
      ...prev,
      {
        sender: "system",
        text: `Ticket ${ticket.id} created successfully. Status: ${ticket.status}.`,
      },
    ]);
  };

  return (
    <div className="page">
      <div className="bg-blur bg-one" />
      <div className="bg-blur bg-two" />

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
          <span className="status-dot" />
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
            AI Help Center Module
          </div>

          <h1>
            Support that feels <span>intelligent.</span>
          </h1>

          <p>
            Search help articles, ask Sear AI, create tickets, run diagnostics,
            and connect to a real support agent when needed.
          </p>

          <div className="search-box">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search password, dashboard, billing, error..."
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
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
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
                    className={`category-card ${categoryId === category.id ? "active-card" : ""}`}
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
              {filteredArticles.map((article) => (
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

              {filteredArticles.length === 0 && (
                <p className="empty-text">
                  No result found. Try another keyword.
                </p>
              )}
            </div>
          </div>

          <div className="panel ai-diagnostics" id="diagnostics">
            <div className="section-header">
              <h2>AI Diagnostics</h2>
              <span className="article-count">
                Frontend demo now, backend-ready later
              </span>
            </div>

            <div className="diagnostic-grid">
              <DiagnosticCard
                icon={<Wifi />}
                title="Connection"
                text="Check network and service reachability."
              />
              <DiagnosticCard
                icon={<Activity />}
                title="AI Response"
                text="Test AI response speed and availability."
              />
              <DiagnosticCard
                icon={<ShieldCheck />}
                title="Security"
                text="Check account safety and login health."
              />
            </div>
          </div>

          <div className="panel timeline-panel">
            <div className="section-header">
              <h2>Support Flow</h2>
            </div>

            <div className="timeline">
              <Step
                number="01"
                title="Search"
                text="User searches the knowledge base."
              />
              <Step
                number="02"
                title="Ask AI"
                text="Sear AI gives instant support."
              />
              <Step
                number="03"
                title="Create Ticket"
                text="Unsolved issues become tickets."
              />
              <Step
                number="04"
                title="Human Agent"
                text="Admin joins the live chat."
              />
            </div>
          </div>

          <motion.div className="support-card" whileHover={{ scale: 1.01 }}>
            <div className="support-visual">
              <Headphones size={70} />
            </div>

            <div>
              <h2>Need human support?</h2>
              <p>
                Sear AI handles the first response. If the issue needs a person,
                the user can create a ticket and connect to a support agent.
              </p>
              {ticketInfo && (
                <p className="ticket">Current ticket: {ticketInfo.id}</p>
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
                <p>AI engine, search and support are online.</p>
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
                <p className="empty-text">No saved articles yet.</p>
              )}
            </div>

            <hr />

            <h2>Support Insights</h2>
            <div className="insight-box">
              <div>
                <strong>24/7</strong>
                <span>AI support</span>
              </div>
              <div>
                <strong>5m</strong>
                <span>Avg response</span>
              </div>
              <div>
                <strong>96%</strong>
                <span>AI resolved</span>
              </div>
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
          <p>
            Professional AI help center module built for dashboard integration.
          </p>
          <div className="socials">
            <Globe />
            <Mail onClick={() => setSupportOpen(true)} />
            <MessageCircle onClick={() => setChatOpen(true)} />
          </div>
        </div>

        <div>
          <h4>Product</h4>
          <a>Dashboard</a>
          <a>AI Tools</a>
          <a>Workflows</a>
        </div>
        <div>
          <h4>Support</h4>
          <a>Help Center</a>
          <a>Tickets</a>
          <a>Live Chat</a>
        </div>
        <div>
          <h4>Company</h4>
          <a>About</a>
          <a>Blog</a>
          <a>Careers</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a>Privacy</a>
          <a>Terms</a>
          <a>Security</a>
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
            requestAgent={requestAgent}
            agentRequested={agentRequested}
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
      <button onClick={() => alert(`${title} check completed successfully.`)}>
        Run Check
      </button>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div>
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ArticleModal({ article, onClose, onSave }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>{article.title}</h2>
        <span>{article.categoryId}</span>
        <p>{article.body}</p>

        <div className="modal-actions">
          <button onClick={onSave}>
            <Bookmark size={16} /> Save Article
          </button>
          <button onClick={() => setFeedback("Thanks. We are glad it helped.")}>
            <ThumbsUp size={16} /> Helpful
          </button>
          <button
            onClick={() => setFeedback("Thanks. We will improve this article.")}
          >
            <ThumbsDown size={16} /> Not helpful
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
      <motion.div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>Create Support Ticket</h2>
        <p>
          Submit your issue. Later this will connect to your Python backend.
        </p>

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
  requestAgent,
  agentRequested,
}) {
  return (
    <motion.div
      className="chat-box"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="chat-header">
        <div>
          <strong>Sear AI Chat</strong>
          <p>
            {agentRequested ? "Human support connected" : "AI assistant online"}
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
        <button onClick={requestAgent}>
          <UserRound size={14} />
          {agentRequested ? "Agent Connected" : "Connect Human Agent"}
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
