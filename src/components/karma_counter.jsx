// src/components/KarmaCounter.jsx
// src/components/KarmaCounter.jsx
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function KarmaCounter({ userId }) {
  const [karma, setKarma] = useState(100);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
      setKarma(doc.data()?.karma || 100);
    });
    return () => unsubscribe();
  }, [userId]);

  // ... rest unchanged ...
}
