import React, { useState } from "react";

import { useChat } from "./ChatContext";

type LiveAssistantProps = {
  userName?: string;
};

const LiveAssistant: React.FC<LiveAssistantProps> = ({ userName }) => {
  const { isOpen, toggleChat } = useChat();
  const [agentStatus, setAgentStatus] = useState<
    "available" | "busy" | "offline"
  >("available");

  return (
    <div
      className={`fixed bottom-24 right-6 bg-white rounded-lg shadow-lg transition-all z-40 ${
        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="p-3 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            agentStatus === "available"
              ? "bg-green-500"
              : agentStatus === "busy"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        ></div>
        <span className="text-sm font-medium">
          {userName ? `${userName}, konsultant czeka` : "Konsultant online"}
        </span>
      </div>
      <button
        onClick={toggleChat}
        className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition"
      >
        {userName ? "Kontynuuj czat" : "Rozpocznij czat"}
      </button>
    </div>
  );
};

export default LiveAssistant;
