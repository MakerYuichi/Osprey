import { useEffect, useState } from 'react';
import { detectToxicity } from './utils/toxicity';
import { addMessageToFirestore } from './utils/messages';

function App() {
  const [userId, setUserId] = useState(null);
  const [flaggedMessage, setFlaggedMessage] = useState(null);

  useEffect(() => {
    initAuth().then(uid => setUserId(uid));
  }, []);

  const handleSend = async (text) => {
    if (!userId || !text.trim()) return;

    const toxicity = await detectToxicity(text);
    if (toxicity > 0.9) {
      setFlaggedMessage(text);
    } else {
      await addMessageToFirestore(text, userId);
    }
  };

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <KarmaCounter userId={userId} />
      
      <input
        type="text"
        onKeyDown={(e) => e.key === 'Enter' && handleSend(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-2 border rounded"
      />

      {flaggedMessage && (
        <ReflectionWindow
          message={flaggedMessage}
          onSend={async (msg) => {
            await addMessageToFirestore(msg, userId);
            setFlaggedMessage(null);
          }}
          onCancel={() => setFlaggedMessage(null)}
        />
      )}
    </div>
  );
}

export default App;