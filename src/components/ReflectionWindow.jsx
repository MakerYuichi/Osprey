import React, { useEffect, useState } from 'react';
import rephraseText from '../utils/rephrase';
import { updateKarma, getKarma } from '../utils/karma';
import checkToxicity from '../utils/toxicity';
import ContextualEmpathyMap from './ContextualEmpathyMap';
import { getEmpathyMap } from '../utils/cosmicContext';
import MirrorVerseAI from './MirrorVerseAI';
import '../static/style2.css'; // 👈 Your CSS file

const ReflectionWindow = ({ originalMessage, onClose, sendMessage }) => {
  const [timeoutActive, setTimeoutActive] = useState(false);
  const [karma, setKarma] = useState(0);
  const [empathyMap, setEmpathyMap] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutActive(true);
      onClose(); // 👈 close the reflection window after timeout
    }, 7000);
  
    const currentKarma = getKarma();
    setKarma(currentKarma);
  
    if (currentKarma > 3 && originalMessage) {
      const map = getEmpathyMap(originalMessage);
      setEmpathyMap(map);
    } else {
      setEmpathyMap(null);
    }
  
    return () => clearTimeout(timer);
  }, [originalMessage, onClose]);
  

  const handleRephrase = async () => {
    const newText = await rephraseText(originalMessage);
    const isToxic = await checkToxicity(newText);

    if (isToxic) {
      updateKarma(-1);
      console.log('😬 Still toxic after rephrasing. Message blurred.');
    } else {
      updateKarma(0.25);
      console.log('✅ Clean rephrased message sent:', newText);
      sendMessage(newText);
    }

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
    <div className="reflection-container">
      <p className="reflection-warning">⚠️ This message may be toxic:</p>
      <p className="reflection-original">“{originalMessage}”</p>

      <div className="reflection-buttons">
        <button className="btn btn-green" onClick={handleRephrase}>
          ✅ Rephrase & Send
        </button>
        <button className="btn btn-red" onClick={handleSendAnyway}>
          ❌ Send Anyway (-1 Karma)
        </button>
        <button className="btn btn-gray" onClick={handleDelete}>
          🗑️ Delete (+0.25)
        </button>
      </div>

      {empathyMap && (
        <div className="reflection-section">
          <ContextualEmpathyMap map={empathyMap} />
        </div>
      )}

      {karma <= 3 && (
        <div className="reflection-section">
          <MirrorVerseAI karma={karma} />
        </div>
      )}

      
    </div>
  );
};

export default ReflectionWindow;


