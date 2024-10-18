import React from 'react';

interface ChatBoxProps {
  messages: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="mb-4 h-64 overflow-y-auto border border-gray-300 rounded p-2">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <p className={`p-2 rounded ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}`}>
            {message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;