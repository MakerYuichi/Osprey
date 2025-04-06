import React, { useState, useEffect } from 'react';

const KarmaCounter = () => {
  const [karma, setKarma] = useState(8); // default karma

  // Placeholder: Later connect to Firebase Firestore

  return (
    <div className="text-lg font-medium">
      Karma: {karma}
    </div>
  );
};

export default KarmaCounter;


