import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const logMessage = async (userId, message, isToxic) => {
  await addDoc(collection(db, "messages"), {
    userId,
    message,
    isToxic,
    timestamp: new Date()
  });
};
