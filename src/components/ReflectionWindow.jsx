// src/components/ReflectionWindow.jsx
import { useEffect, useState } from 'react';
import { updateKarma } from '../utils/karma';
import { rephraseMessage } from '../utils/rephrase'; // GPT-4 wrapper

export default function ReflectionWindow({ message, onSend, onCancel }) {
  const [timeLeft, setTimeLeft] = useState(7);
  const [rephrased, setRephrased] = useState('');
  const [loading, setLoading] = useState(false);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft === 0) {
      onCancel(); // timeout
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleRephrase = async () => {
    setLoading(true);
    const better = await rephraseMessage(message);
    setRephrased(better);
    setLoading(false);
  };

  const handleSendAnyway = () => {
    updateKarma(-1); // penalty
    onSend(message);
  };

  const handleDelete = () => {
    updateKarma(+0.25); // reward
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">⚠️ Reflect Before Sending</h2>
        <p className="text-gray-800 mb-2">“{message}”</p>
        <p className="text-sm text-gray-500 mb-4">This might be harmful. You have {timeLeft}s to reflect.</p>

        <div className="flex flex-col gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleRephrase}
            disabled={loading}
          >
            {loading ? 'Rephrasing...' : '✨ Rephrase & Send'}
          </button>

          {rephrased && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => onSend(rephrased)}
            >
              ✅ Send Rephrased
            </button>
          )}

          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={handleDelete}
          >
            🗑️ Delete Message (+0.25 karma)
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleSendAnyway}
          >
            ❌ Send Anyway (-1 karma)
          </button>
        </div>
      </div>
    </div>
  );
}
