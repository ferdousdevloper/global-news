import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Load environment variables from .env.local
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };




// Rabi****************Rabi 

const firebaseConfig = {
  apiKey: "AIzaSyCZHB42n_80-Rr_8LMa3Q8YkAOYM8Vk-S8",
  authDomain: "endgame-e5c55.firebaseapp.com",
  projectId: "endgame-e5c55",
  storageBucket: "endgame-e5c55.appspot.com",
  messagingSenderId: "999870863315",
  appId: "1:999870863315:web:2d9d302b9222b569980126"
};

// Rabi *************************Rabi 




// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { app, auth };
