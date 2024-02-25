import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCXkaQavrvcJjHeV8TT-k0QRrl6hPt57GI",
    authDomain: "chatsassai.firebaseapp.com",
    projectId: "chatsassai",
    storageBucket: "chatsassai.appspot.com",
    messagingSenderId: "717740324608",
    appId: "1:717740324608:web:25739ed5bb57e730c225e5"
  }

const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export{db,auth,functions};