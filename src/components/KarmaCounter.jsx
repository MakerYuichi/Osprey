import React, { useState, useEffect } from 'react';
import { getKarma, subscribeToKarma } from '../utils/karma';

const KarmaCounter = () => {
  const [karma, setKarma] = useState(getKarma());

  useEffect(() => {
    subscribeToKarma(setKarma); // React listens for karma updates
  }, []);

  return (
    <div className="mb-4 text-lg">
      🔥 Karma Points: <span className="font-semibold">{karma}</span>
    </div>
  );
};

export default KarmaCounter;



