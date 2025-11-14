import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD95UuvNGH-WWsh1ZC4slIhR57z4pGFHpo",
  authDomain: "healthvalue-43a83.firebaseapp.com",
  projectId: "healthvalue-43a83",
  storageBucket: "healthvalue-43a83.firebasestorage.app",
  messagingSenderId: "627824913098",
  appId: "1:627824913098:web:8178a1c6af17427dfae233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

export { auth, db };
