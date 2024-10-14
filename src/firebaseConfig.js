// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCaEpGJwpmyHZhKLR_BVzagZhDTGIWZ_68",
  authDomain: "loppi-app-real.firebaseapp.com",
  projectId: "loppi-app-real",
  storageBucket: "loppi-app-real.appspot.com",
  messagingSenderId: "63001039488",
  appId: "1:63001039488:web:2e5f7bfaf8874e55614c65",
  measurementId: "G-7D9XRFGE2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
