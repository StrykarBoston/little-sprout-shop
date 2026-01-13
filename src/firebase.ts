// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTuE2VJP1FC-yrHFYBqZLLW9KQEcj1gSQ",
  authDomain: "e-com-46f01.firebaseapp.com",
  projectId: "e-com-46f01",
  storageBucket: "e-com-46f01.firebasestorage.app",
  messagingSenderId: "1010583032450",
  appId: "1:1010583032450:web:73bba799cb3b28b821da9b",
  measurementId: "G-JFRFED7F18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

export default app;
