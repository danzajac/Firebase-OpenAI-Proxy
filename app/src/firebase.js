// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNxjmBIKqLj9iB41AR0W_lvN47dHSDas",
  authDomain: "hr-oai-proxy.firebaseapp.com",
  projectId: "hr-oai-proxy",
  storageBucket: "hr-oai-proxy.appspot.com",
  messagingSenderId: "1070106172720",
  appId: "1:1070106172720:web:eb846a68de944a0fbb7cf5",
  measurementId: "G-1CGN0HRBJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth();


export { db, auth };
