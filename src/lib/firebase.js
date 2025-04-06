// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";           

const firebaseConfig = {
  apiKey: "AIzaSyCYiMpLyqp8oAmquZ-6IZuavsLXcb2ZV-E",
  authDomain: "osprey-fc293.firebaseapp.com",
  projectId: "osprey-fc293",
  storageBucket: "osprey-fc293.firebasestorage.app",
  messagingSenderId: "206102925753",
  appId: "1:206102925753:web:6f9db0113dd4cc1edbe668",
  measurementId: "G-1GFP49WPQH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);  
export const auth = getAuth(app);     


