import React from 'react';
import KarmaCounter from './components/KarmaCounter';
import ChatInput from './components/ChatInput';

const App = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">Osprey Chat Moderation</h1>
      <KarmaCounter />
      <ChatInput />
    </div>
  );
};

export default App;


