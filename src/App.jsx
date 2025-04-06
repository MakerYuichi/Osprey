import { useState } from 'react';
import MessageInput from './components/MessageInput';
import KarmaCounter from './components/KarmaCounter';
import ReflectionWindow from './components/ReflectionWindow';
import MirrorverseModal from './components/MirrorverseModal';
import { detectToxicity } from './utils/toxicity'; // from HuggingFace
import { addMessageToFirestore } from './utils/firebase';

function App() {
  const [flaggedMessage, setFlaggedMessage] = useState(null);
  const [karma, setKarma] = useState(100);
  const userId = "demo-user"; // Replace with actual auth user

  const handleSendMessage = async (text) => {
    const score = await detectToxicity(text);
    if (score > 0.9) {
      setFlaggedMessage(text);
    } else {
      await addMessageToFirestore(text, userId);
    }
  };

  return (
    <div>
      <KarmaCounter userId={userId} />
      <MessageInput onSubmit={handleSendMessage} />

      {flaggedMessage && (
        <ReflectionWindow
          message={flaggedMessage}
          onSend={async (finalMsg) => {
            await addMessageToFirestore(finalMsg, userId);
            setFlaggedMessage(null);
          }}
          onCancel={() => setFlaggedMessage(null)}
        />
      )}

      {karma <= 3 && <MirrorverseModal />}
    </div>
  );
}
