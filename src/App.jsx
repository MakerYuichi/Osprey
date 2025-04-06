import React from 'react';
import KarmaCounter from './components/KarmaCounter';
import ChatWindow from './components/ChatWindow';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center font-sans">
      <div className="w-full max-w-3xl p-6 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center">
          Osprey Chat Moderation
        </h1>

        {/* Karma Counter */}
        <div className="flex justify-center">
          <KarmaCounter />
        </div>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
};

export default App;




