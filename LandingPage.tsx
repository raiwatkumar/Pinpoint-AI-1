import React from 'react';
import { MessageCircle, Zap, Search, ArrowRight, Highlighter, RefreshCw, Cpu } from 'lucide-react';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 flex items-center justify-center">
          <MessageCircle className="mr-4" size={48} />
          PinPoint AI
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Experience AI-powered conversations with the ability to highlight and ask follow-up questions on specific parts of the response.
        </p>
      </header>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">What is PinPoint AI?</h2>
        <p className="max-w-3xl mx-auto">
          PinPoint AI allows you to interact with AI more efficiently. You can highlight specific parts of an AI-generated response and ask follow-up questions directly about the highlighted text, without needing to repeat or rephrase. It's designed to make AI-powered conversations smoother and more focused.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <FlowchartStep icon={<MessageCircle />} text="User interacts with AI" />
          <ArrowRight className="hidden md:block" />
          <FlowchartStep icon={<Highlighter />} text="User highlights specific text" />
          <ArrowRight className="hidden md:block" />
          <FlowchartStep icon={<Search />} text="User asks follow-up question" />
          <ArrowRight className="hidden md:block" />
          <FlowchartStep icon={<RefreshCw />} text="AI provides focused answer" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Zap size={32} />}
            title="AI-powered follow-up questions"
            description="Ask questions about any highlighted text for deeper insights."
          />
          <FeatureCard
            icon={<Cpu size={32} />}
            title="GPT-4 Integration"
            description="Seamless integration with OpenAI's most advanced language model."
          />
          <FeatureCard
            icon={<MessageCircle size={32} />}
            title="User-friendly Interface"
            description="Intuitive chat interface with real-time responses."
          />
          <FeatureCard
            icon={<Highlighter size={32} />}
            title="One-click Highlighting"
            description="Easily highlight and inquire about specific content."
          />
        </div>
      </section>

      <section className="text-center">
        <button
          onClick={onStartChat}
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full text-lg hover:bg-blue-100 transition duration-300 animate-pulse"
        >
          Get Early Access to PinPoint AI
        </button>
      </section>
    </div>
  );
};

const FlowchartStep: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex flex-col items-center bg-white bg-opacity-20 p-4 rounded-lg">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-sm">{text}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-20 p-6 rounded-lg">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default LandingPage;