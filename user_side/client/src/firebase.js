// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, FieldValue } from "firebase/firestore";
import { getFunctions } from 'firebase/functions'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADRJnpS5NUx1X88tKNXBHBTpwLiTqXeZs",
  authDomain: "farmerskonnect-ece42.firebaseapp.com",
  projectId: "farmerskonnect-ece42",
  storageBucket: "farmerskonnect-ece42.appspot.com",
  messagingSenderId: "601714407227",
  appId: "1:601714407227:web:09d77363a5bb0a42a7a91e",
  measurementId: "G-0VQZJ4RWG1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app)
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const firestamp = FieldValue.serverTimestamp;

export { firestamp, functions, db };