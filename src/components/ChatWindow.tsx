import React from 'react';
import { useChat } from './ChatContext';


const ChatWindow: React.FC = () => {
  const { isOpen, toggleChat, messages, addMessage } = useChat();
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addMessage({
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    });

    setTimeout(() => {
      addMessage({
        text: 'Dziękujemy za wiadomość. Nasz konsultant odpowie w ciągu kilku minut.',
        isUser: false,
        timestamp: new Date()
      });
    }, 1000);

    setNewMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-black text-white rounded-full p-4 shadow-lg z-50 hover:bg-gray-800 transition-all"
        aria-label="Otwórz okno czatu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-bold">Pomoc Anywear</h3>
          <p className="text-xs text-gray-300">Odpowiadamy w ciągu 5 minut</p>
        </div>
        <button onClick={toggleChat} className="text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3/4 rounded-lg px-4 py-2 ${
                message.isUser 
                  ? 'bg-gray-800 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Napisz wiadomość..."
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Twoje dane są chronione zgodnie z RODO.
        </p>
      </form>
    </div>
  );
};

export default ChatWindow;
