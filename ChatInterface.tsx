import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      setError('An unexpected error occurred. Please try again.');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          highlightedText: highlightedText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setMessages(prevMessages => [...prevMessages, { role: 'error', content: 'Error: Failed to get response from AI. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setHighlightedText('');
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      setHighlightedText(selection.toString());
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 flex items-center">
        <ArrowLeft className="mr-4 cursor-pointer" onClick={() => window.location.reload()} />
        <h1 className="text-2xl font-bold">PinPoint AI Chat</h1>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4" onMouseUp={handleHighlight}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.role === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.role === 'error' && <AlertCircle className="inline mr-2" size={16} />}
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-gray-200">
              AI is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="bg-white p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={highlightedText ? "Ask a follow-up question" : "Type your message..."}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={20} />
        </button>
      </form>
      {highlightedText && (
        <div className="bg-yellow-100 p-2 text-sm">
          Highlighted: {highlightedText}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;