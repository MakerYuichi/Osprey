// src/utils/messages.js
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const addMessageToFirestore = async (text, userId) => {
  await setDoc(doc(db, "messages", Date.now().toString()), {
    text,
    userId,
    timestamp: serverTimestamp(),
    isToxic: false, // Flagged messages never reach here
  });
};