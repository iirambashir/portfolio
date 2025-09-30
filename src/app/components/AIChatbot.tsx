"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Iram's AI assistant. Ask me about her experience, skills, projects, or education!",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Knowledge base from your data
  const knowledgeBase = {
    experience: [
      {
        role: "Junior Backend Developer at Norvana",
        period: "Dec 2024 - Present",
        details: "Built scalable backend services with Nest.js and TypeORM. Optimized PostgreSQL queries by 40%. Implemented JWT & OAuth2 authentication."
      },
      {
        role: "Front-End Developer at Tourly Technologies",
        period: "Nov 2023 - Sep 2024",
        details: "Developed responsive UIs with React.js and TypeScript. Optimized performance and ensured accessibility compliance."
      },
      {
        role: "Software Engineer at Jin Technologies",
        period: "Oct 2022 - Oct 2023",
        details: "Led migration of 4D desktop app to web platform, boosting efficiency by 80%. Integrated worker threads reducing processing time by 90%."
      }
    ],
    education: [
      {
        degree: "MS Computer Science",
        institution: "FAST NUCES",
        period: "Expected 2025",
        project: "Advanced Data Analytics Platform with Python, React.js, and PostgreSQL"
      },
      {
        degree: "BS Computer Science",
        institution: "FAST NUCES",
        period: "2018-2022",
        project: "Route & Safety Awareness App using Yolov5, CNN, and Raspberry Pi"
      }
    ],
    skills: {
      frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SASS", "HTML5/CSS"],
      backend: ["Node.js", "Nest.js", "TypeORM", "RESTful APIs", "Swagger", "Postman"],
      tools: ["Git", "Docker", "Agile methodologies", "Trello", "ClickUp"]
    },
    projects: [
      {
        name: "Real-time Task Board",
        description: "Collaborative task management with Socket.IO, featuring real-time updates and optimistic UI"
      },
      {
        name: "Warraich Contracting",
        description: "Responsive business website with modern design for construction company"
      }
    ]
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Experience queries
    if (input.includes("experience") || input.includes("work") || input.includes("job")) {
      const expList = knowledgeBase.experience
        .map(exp => `• ${exp.role} (${exp.period})\n  ${exp.details}`)
        .join("\n\n");
      return `Here's Iram's work experience:\n\n${expList}`;
    }

    // Education queries
    if (input.includes("education") || input.includes("degree") || input.includes("university")) {
      const eduList = knowledgeBase.education
        .map(edu => `• ${edu.degree} - ${edu.institution} (${edu.period})\n  Project: ${edu.project}`)
        .join("\n\n");
      return `Iram's educational background:\n\n${eduList}`;
    }

    // Skills queries
    if (input.includes("skill") || input.includes("technology") || input.includes("tech stack")) {
      return `Iram's technical skills:\n\n🎨 Frontend: ${knowledgeBase.skills.frontend.join(", ")}\n\n⚙️ Backend: ${knowledgeBase.skills.backend.join(", ")}\n\n🛠️ Tools: ${knowledgeBase.skills.tools.join(", ")}`;
    }

    // Projects queries
    if (input.includes("project")) {
      const projList = knowledgeBase.projects
        .map(proj => `• ${proj.name}\n  ${proj.description}`)
        .join("\n\n");
      return `Featured projects:\n\n${projList}`;
    }

    // Contact queries
    if (input.includes("contact") || input.includes("email") || input.includes("reach")) {
      return "You can reach Iram at:\n📧 irambashir889@gmail.com\n💼 GitHub: github.com/IramBashir";
    }

    // Current role
    if (input.includes("currently") || input.includes("now") || input.includes("recent")) {
      return "Iram is currently a Junior Backend Developer at Norvana (since Dec 2024) and pursuing her MS in Computer Science at FAST NUCES (expected 2025).";
    }

    // Nest.js specific
    if (input.includes("nest") || input.includes("backend")) {
      return "Iram has strong expertise in Nest.js! She's currently using it at Norvana to build scalable backend services with TypeORM and PostgreSQL. She's optimized database queries by 40% and implemented secure authentication systems.";
    }

    // React specific
    if (input.includes("react") || input.includes("frontend")) {
      return "Iram is highly skilled in React.js and Next.js! She's built responsive, pixel-perfect UIs and worked extensively with TypeScript and Tailwind CSS during her contract role at Tourly Technologies.";
    }

    // Default
    return "I can help you learn about Iram's experience, education, skills, or projects. Try asking:\n• What's your work experience?\n• Tell me about your education\n• What are your technical skills?\n• Show me your projects\n• How can I contact you?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div
        ref={chatRef}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-white/80">Ask me anything!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <FaTimes className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-purple-400 text-sm" />
                </div>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-white/5 text-gray-200"
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                <span className="text-[10px] opacity-50 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-pink-400 text-sm" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <FaRobot className="text-purple-400 text-sm" />
              </div>
              <div className="bg-white/5 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-gray-900/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about experience, skills, projects..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 