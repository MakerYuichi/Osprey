// src/components/MirrorverseModal.jsx
export default function MirrorverseModal({ onClose }) {
    const scenarios = [
      "🕰️ You see your future self reading this aloud in an interview...",
      "📸 Friends screenshot this and it ends up in a meme group.",
      "📰 Leaked chat shows you being verbally aggressive.",
    ];
  
    const message = scenarios[Math.floor(Math.random() * scenarios.length)];
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">⚠️ Digital Reflection</h2>
          <p className="text-gray-700">{message}</p>
          <button
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            I’ll do better
          </button>
        </div>
      </div>
    );
  }
  