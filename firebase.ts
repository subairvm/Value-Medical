import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfOrqHLup1bLCFtnVmhFB-oddfmpSe0JA",
  authDomain: "healtdatavalue.firebaseapp.com",
  projectId: "healtdatavalue",
  storageBucket: "healtdatavalue.appspot.com",
  messagingSenderId: "281375379982",
  appId: "1:281375379982:web:b6c8106499a6b46a7ee25f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

export { auth, db };
