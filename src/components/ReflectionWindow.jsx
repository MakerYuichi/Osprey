import React, { useEffect, useState } from 'react';
import rephraseText from '../utils/rephrase';
import { updateKarma } from '../utils/karma';

const ReflectionWindow = ({ originalMessage, onClose }) => {
  const [rephrased, setRephrased] = useState('');
  const [timeoutActive, setTimeoutActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutActive(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleRephrase = async () => {
    const newText = await rephraseText(originalMessage);
    console.log('Rephrased message sent:', newText);
    onClose();
  };

  const handleSendAnyway = () => {
    updateKarma(-1);
    console.log('Message sent anyway:', originalMessage);
    onClose();
  };

  const handleDelete = () => {
    updateKarma(0.25);
    console.log('Message deleted.');
    onClose();
  };

  return (
    <div className="bg-yellow-100 p-4 rounded mt-4">
      <p className="mb-2">⚠️ This message may be toxic:</p>
      <p className="italic">“{originalMessage}”</p>
      <div className="mt-4 flex gap-3">
        <button onClick={handleRephrase} className="bg-green-600 text-white px-3 py-1 rounded">✅ Rephrase & Send</button>
        <button onClick={handleSendAnyway} className="bg-red-600 text-white px-3 py-1 rounded">❌ Send Anyway (-1 Karma)</button>
        <button onClick={handleDelete} className="bg-gray-400 text-white px-3 py-1 rounded">🗑️ Delete (+0.25)</button>
      </div>
      {timeoutActive && <p className="mt-2 text-sm text-gray-600">⏳ Timeout reached. Message removed.</p>}
    </div>
  );
};

export default ReflectionWindow;

