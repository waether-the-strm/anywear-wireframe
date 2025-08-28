import React, { useState, useEffect } from "react";
import { useChat } from "./ChatContext";

type ChatWindowProps = {
  userName?: string;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ userName }) => {
  const { isOpen, toggleChat, messages, addMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [agentStatus, setAgentStatus] = useState<
    "available" | "busy" | "offline"
  >("available");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [miniView, setMiniView] = useState(!isOpen && messages.length > 0);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Set miniView state when chat closes
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      setMiniView(true);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    addMessage({
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    });

    setNewMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate agent response with delay
    setTimeout(() => {
      setIsTyping(false);

      // Add agent message
      addMessage({
        text: "Dziękujemy za wiadomość. Nasz konsultant odpowie w ciągu kilku minut.",
        isUser: false,
        timestamp: new Date(),
      });

      // Show notification when chat is not open
      if (!isOpen) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 1500);
  };

  // Jeśli czat jest zamknięty, pokaż przycisk lub mini-widok
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Powiadomienie o nowej wiadomości */}
        {showNotification && (
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-notification mb-2">
            Nowa wiadomość od konsultanta
          </div>
        )}

        {/* Mini widok ostatniej wiadomości */}
        {miniView && messages.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-2 max-w-xs animate-slideIn transition-all transform hover:scale-102 duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    agentStatus === "available"
                      ? "bg-green-500 pulse-animation"
                      : agentStatus === "busy"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-800">
                  Konsultant{" "}
                  {agentStatus === "available"
                    ? "online"
                    : agentStatus === "busy"
                    ? "zajęty"
                    : "offline"}
                </span>
              </div>
              <button
                onClick={() => setMiniView(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Zamknij mini-widok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Ostatnia wiadomość */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3 border-l-2 border-black">
              <p className="text-sm line-clamp-2 text-gray-700">
                {messages[messages.length - 1]?.text || "Jak możemy pomóc?"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {messages[messages.length - 1]?.timestamp.toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={toggleChat}
                className="flex-1 bg-black text-white py-2 px-3 text-sm font-medium hover:bg-gray-800 transition rounded flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Odpowiedz
              </button>
              <button
                onClick={() => (window.location.href = "/faq")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 text-sm rounded transition"
              >
                FAQ
              </button>
            </div>
          </div>
        )}

        {/* Przycisk czatu (widoczny tylko gdy mini-widok jest ukryty) */}
        {!miniView && (
          <button
            onClick={toggleChat}
            className="bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center transform hover:scale-105 duration-200"
            aria-label="Otwórz okno czatu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col max-h-[500px] transition-all animate-slideUp border border-gray-100">
      {/* Header */}
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              agentStatus === "available"
                ? "bg-green-500 pulse-animation"
                : agentStatus === "busy"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
          <div>
            <h3 className="font-bold">Pomoc Anywear</h3>
            <p className="text-xs text-gray-300">
              {agentStatus === "available"
                ? "Odpowiadamy w ciągu 5 minut"
                : agentStatus === "busy"
                ? "Chwilowo większe obciążenie"
                : "Jesteśmy niedostępni"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (window.location.href = "/faq")}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="FAQ"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          <button
            onClick={toggleChat}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Zamknij czat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {userName && (
          <div className="text-center mb-3">
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              Czat z {userName}
            </span>
          </div>
        )}
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {!message.isUser && index > 0 && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white mr-2 self-end mb-1">
                  <span className="text-xs">A</span>
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 shadow-sm ${
                  message.isUser
                    ? "bg-black text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.isUser && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 ml-2 self-end mb-1">
                  <span className="text-xs">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200 max-w-[75%]">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex text-xs text-gray-500 pt-2 px-4 items-center">
          <div className="flex-1 border-b border-gray-100"></div>
          <div className="px-2 flex items-center">
            {agentStatus === "available" && (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span>Konsultant dostępny</span>
              </>
            )}
            {agentStatus === "busy" && (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span>Konsultant odpowie wkrótce</span>
              </>
            )}
            {agentStatus === "offline" && (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Odpowiada bot</span>
              </>
            )}
          </div>
          <div className="flex-1 border-b border-gray-100"></div>
        </div>
        <form onSubmit={handleSendMessage} className="p-3">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-black focus-within:border-black">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Napisz wiadomość..."
              className="flex-grow px-3 py-2 focus:outline-none text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors flex items-center"
              aria-label="Wyślij wiadomość"
              disabled={!newMessage.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span className="ml-1 text-sm">Wyślij</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Twoje dane są chronione zgodnie z RODO
            </p>
            <a
              href="/privacy-policy"
              className="text-xs text-gray-500 hover:text-black underline"
            >
              Polityka prywatności
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dodajmy style animacji
const style = document.createElement("style");
style.textContent = `
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes notification {
    0% { transform: translateY(10px); opacity: 0; }
    10% { transform: translateY(0); opacity: 1; }
    90% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-10px); opacity: 0; }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s ease-out forwards;
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-notification {
    animation: notification 5s ease-out forwards;
  }
  
  .pulse-animation {
    animation: pulse 2s infinite;
  }
  
  .typing-indicator {
    display: flex;
    align-items: center;
    height: 17px;
  }
  
  .typing-indicator span {
    height: 6px;
    width: 6px;
    float: left;
    margin: 0 1px;
    background-color: #9e9ea1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
  }
  
  .typing-indicator span:nth-of-type(1) {
    animation: 1s blink infinite 0.3333s;
  }
  
  .typing-indicator span:nth-of-type(2) {
    animation: 1s blink infinite 0.6666s;
  }
  
  .typing-indicator span:nth-of-type(3) {
    animation: 1s blink infinite 0.9999s;
  }
  
  @keyframes blink {
    50% {
      opacity: 1;
    }
  }
  
  .transform {
    transition-property: transform;
  }
  
  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
  
  .hover\\:scale-105:hover {
    transform: scale(1.05);
  }
  
  .duration-200 {
    transition-duration: 200ms;
  }
  
  .duration-300 {
    transition-duration: 300ms;
  }
`;
document.head.appendChild(style);

export default ChatWindow;
