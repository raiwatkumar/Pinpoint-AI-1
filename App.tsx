import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {showChat ? (
        <ChatInterface />
      ) : (
        <LandingPage onStartChat={() => setShowChat(true)} />
      )}
    </div>
  );
}

export default App;