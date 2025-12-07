import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utility to sanitize user input and prevent XSS attacks
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  // Remove dangerous characters and scripts
  return input
    .replace(/[<>\"']/g, (char) => {
      const map = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
      return map[char];
    })
    .trim()
    .slice(0, 500); // Limit input length
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Olumide Sofowora's Law Firm. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Tell me about your services",
    "How can I book a consultation?",
    "What are your practice areas?",
    "Contact information",
  ];
  const botResponses = {
    services: {
      keywords: ["services", "practice", "areas", "expertise"],
      response:
        "We specialize in corporate law, family law, criminal defense, real estate, and intellectual property.",
      actions: [
        {
          type: "navigate",
          to: "/practice-areas",
          label: "See Practice Areas",
        },
      ],
    },
    consultation: {
      keywords: ["consultation", "book", "appointment", "schedule", "meet"],
      response:
        "Would you like to book a consultation now? I can take you to the booking page.",
      actions: [
        { type: "ask", intent: "book_now", label: "Yes, book now" },
        { type: "text", label: "Not now" },
      ],
    },
    contact: {
      keywords: ["contact", "phone", "email", "address", "reach"],
      response:
        "You can reach us Monday–Friday, 9AM–5PM. Would you like our phone number or email link?",
      actions: [
        { type: "text", label: "Show phone" },
        { type: "text", label: "Show email" },
      ],
    },
    team: {
      keywords: ["team", "lawyer", "attorney", "staff", "who"],
      response:
        "Our team includes experienced attorneys across multiple specialties.",
      actions: [{ type: "navigate", to: "/teampage", label: "Meet the Team" }],
    },
    about: {
      keywords: ["about", "who are you", "about us"],
      response: "Learn more about our firm and history.",
      actions: [{ type: "navigate", to: "/about", label: "About Us" }],
    },
    history: {
      keywords: ["back", "forward", "previous", "next"],
      response: "I can navigate your browser history for you.",
      actions: [
        { type: "back", label: "Go Back" },
        { type: "forward", label: "Go Forward" },
      ],
    },
    default: {
      keywords: [],
      response:
        "Thanks — I can help with services, booking consultations, contact details, or our team. Which would you like?",
      actions: [
        { type: "navigate", to: "/practice-areas", label: "Practice Areas" },
        { type: "ask", intent: "consultation", label: "Book Consultation" },
        { type: "navigate", to: "/about", label: "About" },
      ],
    },
  };

  const navigate = useNavigate();

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, value] of Object.entries(botResponses)) {
      if (value.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return value;
      }
    }

    return botResponses.default;
  };

  // Helper to push a bot message with optional actions
  const pushBotMessage = (messageObj) => {
    const botMessage = {
      id: Date.now(),
      text: messageObj.response,
      sender: "bot",
      timestamp: new Date(),
      actions: messageObj.actions || [],
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Sanitize input to prevent XSS
    const sanitized = sanitizeInput(inputValue);
    if (sanitized === "") return;

    // Add user message with sanitized text
    const userMessage = {
      id: messages.length + 1,
      text: sanitized,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot typing delay then push structured response
    // NOTE: In production, this should validate server-side!
    setTimeout(() => {
      const resp = getBotResponse(sanitized);
      pushBotMessage(resp);
      setIsLoading(false);
    }, 600);
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setTimeout(() => {
      const resp = getBotResponse(reply);
      pushBotMessage(resp);
      setIsLoading(false);
    }, 600);
  };

  const handleAction = (action) => {
    const userMessage = {
      id: Date.now() + 1,
      text: action.label,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    if (action.type === "navigate") {
      // navigate but keep chat open; offer a back action so user can return
      navigate(action.to);
      pushBotMessage({
        response: `Taking you to ${action.label}.`,
        actions: [{ type: "back", label: "Go Back" }],
      });
    } else if (action.type === "back") {
      // go back in history
      try {
        navigate(-1);
        pushBotMessage({ response: "Went back in history." });
      } catch (err) {
        pushBotMessage({ response: "Unable to go back." });
      }
    } else if (action.type === "forward") {
      try {
        navigate(1);
        pushBotMessage({ response: "Went forward in history." });
      } catch (err) {
        pushBotMessage({ response: "Unable to go forward." });
      }
    } else if (action.type === "ask") {
      const intent = action.intent;
      if (botResponses[intent]) {
        pushBotMessage(botResponses[intent]);
      } else {
        pushBotMessage(botResponses.default);
      }
    } else if (action.type === "text") {
      if (action.label.toLowerCase().includes("phone")) {
        pushBotMessage({
          response: "Phone: (+234) 805 4012 125 | (+234) 806 4660 083",
        });
      } else if (action.label.toLowerCase().includes("email")) {
        pushBotMessage({ response: "Email: contact@sofoworalaw.com" });
      } else {
        pushBotMessage({ response: action.label });
      }
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-40">
        {/* Chat Window */}
        <div
          className={`absolute 
      bottom-20 right-0 
      w-72 sm:w-80 md:w-96 
      max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh]
      bg-white rounded-lg shadow-2xl 
      transition-all duration-300 transform origin-bottom-right
      ${
        isOpen
          ? "scale-100 opacity-100 visible"
          : "scale-75 opacity-0 invisible"
      }`}
        >
          {/* Header */}
          <div className="bg-brand text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                Chat with us
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                We typically reply in minutes
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl hover:bg-white hover:bg-opacity-20 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="
      flex flex-col 
      bg-gray-50 
      overflow-y-auto 
      p-3 sm:p-4 
      h-[50vh] sm:h-[55vh] md:h-80
    "
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-xs px-3 py-2 rounded-lg text-sm 
              ${
                message.sender === "user"
                  ? "bg-brand text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }
            `}
                >
                  <p className="text-xs sm:text-sm">{message.text}</p>

                  <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Action buttons */}
                {message.sender === "bot" &&
                  message.actions &&
                  message.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 ml-2">
                      {message.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(action)}
                          className="
                      text-[10px] sm:text-xs 
                      px-2 py-1 
                      bg-gray-100 
                      hover:bg-brand hover:text-white 
                      rounded transition
                    "
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
              <p className="text-[10px] sm:text-xs text-gray-600 mb-2 font-semibold">
                Common questions:
              </p>

              <div className="flex flex-col gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="
                text-left text-[10px] sm:text-xs 
                bg-gray-100 
                hover:bg-brand hover:text-white 
                text-gray-700 
                px-3 py-2 
                rounded transition
              "
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-2 sm:p-3 bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="
            flex-1 px-2 sm:px-3 py-2 
            border border-gray-300 
            rounded-lg 
            focus:outline-none focus:border-brand 
            text-xs sm:text-sm
          "
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || inputValue.trim() === ""}
                className="
            bg-brand text-white 
            px-3 sm:px-4 py-2 
            rounded-lg 
            text-xs sm:text-sm
            hover:bg-opacity-90 
            transition 
            disabled:opacity-50 
            disabled:cursor-not-allowed
          "
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
      bg-brand text-white rounded-full 
      w-12 h-12 sm:w-14 sm:h-14 
      flex items-center justify-center 
      shadow-lg hover:shadow-xl 
      transition-all duration-300 hover:scale-110
    "
          aria-label="Open chat"
        >
          {isOpen ? (
            <span className="text-xl sm:text-2xl">×</span>
          ) : (
            <span className="text-xl sm:text-2xl">💬</span>
          )}
        </button>
      </div>
    </>
  );
}
