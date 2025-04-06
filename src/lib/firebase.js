import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "osprey-fc293.firebaseapp.com",
  projectId: "osprey-fc293",
  storageBucket: "osprey-fc293.appspot.com",
  messagingSenderId: "206102925753",
  appId: "1:206102925753:web:6f9db0113dd4cc1edbe668",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ No initAuth here!


