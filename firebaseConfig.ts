import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz-ZbUFPuyLLRYfUPJ_B1IP4JhlN3bM6M",
  authDomain: "reactutor.firebaseapp.com",
  projectId: "reactutor",
  storageBucket: "reactutor.firebasestorage.app",
  messagingSenderId: "357805683370",
  appId: "1:357805683370:web:0a5f235d7a22c59ecf56d3",
  measurementId: "G-6VQZJM5E4T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
