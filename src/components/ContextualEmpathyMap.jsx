import React from 'react';

const ContextualEmpathyMap = ({ map }) => {
  if (!map || !map.insights) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4 shadow-inner">
      <h3 className="text-blue-800 font-semibold mb-2">🌐 Global Empathy Lens</h3>
      <p className="text-sm text-gray-700 mb-2">
        This is how your message might be interpreted by others:
      </p>
      <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm">
        {map.insights.map((insight, index) => (
          <li key={index}>🧠 {insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContextualEmpathyMap;

