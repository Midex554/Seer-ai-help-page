import {
  FileText,
  Settings,
  Shield,
  HelpCircle,
  Bot,
  CreditCard,
  KeyRound,
  Zap,
} from "lucide-react";

export const categories = [
  {
    id: "getting-started",
    icon: FileText,
    title: "Getting Started",
    description: "Set up your account and learn how Sear AI works.",
  },
  {
    id: "ai-assistant",
    icon: Bot,
    title: "AI Assistant",
    description: "Learn how to use Sear AI prompts, workflows and responses.",
  },
  {
    id: "account-security",
    icon: Shield,
    title: "Account & Security",
    description: "Manage login, password, verification and privacy.",
  },
  {
    id: "features",
    icon: Settings,
    title: "Features",
    description: "Understand tools, dashboard features and usage.",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing",
    description: "Plans, payment, subscription and invoices.",
  },
  {
    id: "troubleshooting",
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Fix errors, slow response and access issues.",
  },
];

export const articles = [
  {
    id: 1,
    categoryId: "getting-started",
    title: "How to get started with Sear AI",
    summary:
      "Create your account, verify your email, and start using the AI workspace.",
    body: "To get started with Sear AI, create an account, verify your email, complete your profile, then open your dashboard. From the dashboard, you can start a new AI session, create workflows, save outputs, and manage your account settings.",
    tags: ["setup", "new user", "dashboard"],
  },
  {
    id: 2,
    categoryId: "ai-assistant",
    title: "How to write better prompts",
    summary: "Use clear instructions, context, format and expected output.",
    body: "A good prompt should explain the task, provide context, specify the output format, and mention any restrictions. Example: 'Create a professional email for a client using a polite tone and keep it under 150 words.'",
    tags: ["prompt", "ai", "workflow"],
  },
  {
    id: 3,
    categoryId: "account-security",
    title: "How to reset your password",
    summary: "Use the forgot password option and verify your email.",
    body: "Go to the login page, click Forgot Password, enter your registered email, then follow the reset link sent to your inbox. If you do not receive the email, check spam or request a new link.",
    tags: ["password", "login", "security"],
  },
  {
    id: 4,
    categoryId: "features",
    title: "Understanding the Sear AI dashboard",
    summary:
      "Learn the purpose of the dashboard, history, saved outputs and tools.",
    body: "The dashboard is your main workspace. It contains your recent conversations, saved workflows, AI tools, account information, usage statistics, and support access.",
    tags: ["dashboard", "features", "workspace"],
  },
  {
    id: 5,
    categoryId: "billing",
    title: "How billing and subscription works",
    summary: "Understand plans, invoices, renewal and payment status.",
    body: "Billing settings allow you to manage your plan, view invoices, update payment method, and cancel or renew subscriptions. For failed payments, update your card or contact support.",
    tags: ["billing", "payment", "subscription"],
  },
  {
    id: 6,
    categoryId: "troubleshooting",
    title: "Sear AI is not responding",
    summary: "Check your network, refresh the page, and confirm system status.",
    body: "If Sear AI is not responding, check your internet connection, refresh the browser, clear cache, or check system status. If the issue continues, create a support ticket or connect with a human agent.",
    tags: ["error", "slow", "not responding"],
  },
];

export const quickActions = [
  {
    label: "Reset password",
    icon: KeyRound,
    message: "I need help resetting my password",
  },
  {
    label: "Fix AI error",
    icon: Zap,
    message: "Sear AI is not responding",
  },
  {
    label: "Prompt help",
    icon: Bot,
    message: "How can I write better prompts?",
  },
];
