import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  onFollowUpSubmit: (question: string) => void;
  highlightedText: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  onFollowUpSubmit,
  highlightedText,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      if (highlightedText) {
        onFollowUpSubmit(question);
      } else {
        onSubmit(question);
      }
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={highlightedText ? "Ask a follow-up question" : "Ask a question"}
          className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={20} />
        </button>
      </div>
      {highlightedText && (
        <p className="mt-2 text-sm text-gray-600">
          Asking follow-up question based on highlighted text
        </p>
      )}
    </form>
  );
};

export default QuestionForm;