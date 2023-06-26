import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: window.env.FIREBASE_APIKEY,
  authDomain: window.env.FIREBASE_AUTHDOMAIN,
  projectId: window.env.FIREBASE_PROJECTID,
  storageBucket: window.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.env.FIREBASE_MSG_SID,
  appId: window.env.FIREBASE_APPID
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)