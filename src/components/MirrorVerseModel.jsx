// src/components/MirrorverseModal.jsx
import React from 'react';

const MirrorVerseModel = ({ message }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
      <p className="font-semibold">Your digital self says:</p>
      <p className="italic">“Why would you say this to me?”</p>
      <p className="text-sm mt-2 text-gray-600">Potential Impact: This could harm your reputation.</p>
    </div>
  );
};

export default MirrorVerseModel;

  