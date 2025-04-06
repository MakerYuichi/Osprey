import React, { useState } from 'react';
import checkToxicity from '../utils/toxicity';
import { updateKarma } from '../utils/karma';
import ReflectionWindow from './ReflectionWindow';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isToxic, setIsToxic] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const handleSend = async () => {
    const toxic = await checkToxicity(message);
    if (toxic) {
      setIsToxic(true);
      setShowReflection(true);
    } else {
      console.log('✅ Message Clean:', message);
      // Send message logic here
      setMessage('');
    }
  };

  return (
    <div className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Send
      </button>

      {showReflection && (
        <ReflectionWindow
          originalMessage={message}
          onClose={() => {
            setShowReflection(false);
            setMessage('');
          }}
        />
      )}
    </div>
  );
};

export default ChatInput;
