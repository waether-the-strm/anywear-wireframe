import React from 'react';
import { ChatProvider } from './ChatContext';
import ChatWindow from './ChatWindow';

type ChatSupportProps = {
  user?: {
    name: string;
    email?: string;
  };
}

// Komponent opakowujący dla funkcjonalności czatu
const ChatSupport: React.FC<ChatSupportProps> = ({ user }) => {
  return (
    <ChatProvider>
      <ChatWindow userName={user?.name} />
    </ChatProvider>
  );
};

export default ChatSupport;
