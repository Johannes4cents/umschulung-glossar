// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwB6T1bhlE4xdIlk56mXjGeupzoaDcPes",
  authDomain: "umschulungglossar.firebaseapp.com",
  projectId: "umschulungglossar",
  storageBucket: "umschulungglossar.appspot.com",
  messagingSenderId: "740638497278",
  appId: "1:740638497278:web:3c52c97589922070ba48af",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const realDb = getDatabase(app);
export const functions = getFunctions(app);
export const user = getAuth(app);
export const storage = getStorage(app);
export { db };
