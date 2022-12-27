import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOvnxlfh-rXWh4VrBTouJ-BTFiMOE_3i4",
  authDomain: "sha2a-a669e.firebaseapp.com",
  databaseURL: "https://sha2a-a669e-default-rtdb.firebaseio.com",
  projectId: "sha2a-a669e",
  storageBucket: "sha2a-a669e.appspot.com",
  messagingSenderId: "347487545133",
  appId: "1:347487545133:web:59e2deb14a0eee0066d5a4",
  measurementId: "G-Q2M4PE7GHY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;
