import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLNnIwesahJuJH3PLzJSiufi_dyBsj9u8",
  authDomain: "blog-dashboard-auth.firebaseapp.com",
  projectId: "blog-dashboard-auth",
  storageBucket: "blog-dashboard-auth.firebasestorage.app",
  messagingSenderId: "743757986950",
  appId: "1:743757986950:web:098921ce2f30e8aae72507",
  measurementId: "G-R4VS4M5773",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Realtime Database
export const realTimeDataBase = getDatabase(app);
