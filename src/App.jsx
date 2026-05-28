import React from "react";
import {
  Search,
  FileText,
  Settings,
  Shield,
  HelpCircle,
  MessageCircle,
  GraduationCap,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Headphones,
  Bot,
  Globe,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import "./App.css";

const categories = [
  {
    icon: <FileText />,
    title: "Getting Started",
    text: "Learn the basics and set up Sear AI in minutes.",
    count: "12 articles",
  },
  {
    icon: <Settings />,
    title: "Features",
    text: "Explore smart AI tools and advanced features.",
    count: "28 articles",
  },
  {
    icon: <Bot />,
    title: "AI Assistant",
    text: "Understand how to use Sear AI effectively.",
    count: "18 articles",
  },
  {
    icon: <Shield />,
    title: "Account & Security",
    text: "Manage your account, privacy, and security.",
    count: "14 articles",
  },
  {
    icon: <HelpCircle />,
    title: "Troubleshooting",
    text: "Find solutions to common problems.",
    count: "23 articles",
  },
];

const articles = [
  "How to get started with Sear AI",
  "How to create your first AI workflow",
  "How to manage your account settings",
  "How to reset your password",
  "Best practices for using AI prompts",
];

export default function App() {
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
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Support</a>
          <a href="#">Resources</a>
        </div>

        <div className="nav-actions">
          <span className="status-dot"></span>
          <span>Status</span>
          <button>
            Open Sear AI <ExternalLink size={16} />
          </button>
        </div>
      </nav>

      <section className="hero">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Intelligent support for the <span>modern world.</span>
          </h1>

          <p>
            Sear AI helps users solve problems faster with smart documentation,
            intelligent assistance, and real-time support.
          </p>

          <div className="search-box">
            <Search />
            <input placeholder="Search for help, guides, articles..." />
          </div>
        </motion.div>

        <motion.div
          className="ai-orbit"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <div className="planet">
            <Bot size={54} />
          </div>

          <div className="orbit-icon icon-one">
            <FileText />
          </div>

          <div className="orbit-icon icon-two">
            <MessageCircle />
          </div>

          <div className="orbit-icon icon-three">
            <GraduationCap />
          </div>
        </motion.div>
      </section>

      <main className="content">
        <section className="left">
          <div className="panel">
            <div className="section-header">
              <h2>Browse by category</h2>
              <a href="#">
                See all categories <ArrowRight size={16} />
              </a>
            </div>

            <div className="category-grid">
              {categories.map((item, index) => (
                <motion.div
                  className="category-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span>{item.count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="support-card" whileHover={{ scale: 1.01 }}>
            <div className="support-visual">
              <Headphones size={70} />
            </div>

            <div>
              <h2>Still need help?</h2>
              <p>
                Our support team is ready to help you solve issues, understand
                features, and get the best out of Sear AI.
              </p>
            </div>

            <div className="support-actions">
              <button className="primary">
                Contact Support <ArrowRight size={18} />
              </button>

              <button className="secondary">
                Live Chat <MessageCircle size={18} />
              </button>

              <small>Average response time: 5 minutes</small>
            </div>
          </motion.div>
        </section>

        <aside className="right">
          <div className="panel status-panel">
            <h2>System Status</h2>

            <div className="system-ok">
              <CheckCircle />
              <div>
                <strong>All systems operational</strong>
                <p>Updated 2 min ago</p>
              </div>
            </div>

            <button className="status-btn">
              View status page <ExternalLink size={15} />
            </button>

            <hr />

            <h2>Popular Articles</h2>

            <div className="article-list">
              {articles.map((article) => (
                <motion.div
                  className="article"
                  key={article}
                  whileHover={{ x: 8 }}
                >
                  <FileText size={16} />
                  <span>{article}</span>
                  <ArrowRight size={15} />
                </motion.div>
              ))}
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

          <p>Black and white AI support system for a smarter digital future.</p>

          <div className="socials">
            <Globe />
            <Mail />
            <MessageCircle />
          </div>
        </div>

        <div>
          <h4>Product</h4>
          <a href="#">Features</a>
          <a href="#">AI Tools</a>
          <a href="#">Updates</a>
        </div>

        <div>
          <h4>Resources</h4>
          <a href="#">Help Center</a>
          <a href="#">Guides</a>
          <a href="#">Documentation</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
        </div>

        <div>
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}
