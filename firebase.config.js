import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBYCRuUtdhvU-1u1XjByzjeaeabdX6J24",
  authDomain: "taskit-ec71e.firebaseapp.com",
  projectId: "taskit-ec71e",
  storageBucket: "taskit-ec71e.appspot.com",
  messagingSenderId: "93746837989",
  appId: "1:93746837989:web:4ddc33d916ce31c25ed70c",
  measurementId: "G-3B59GK1KD3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
