// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3EK1x68TgLdB7wIgpQ9bssBU4jnN7EVs",
  authDomain: "big-system-64b55.firebaseapp.com",
  databaseURL: "https://big-system-64b55-default-rtdb.firebaseio.com",
  projectId: "big-system-64b55",
  storageBucket: "big-system-64b55.appspot.com",
  messagingSenderId: "668337844782",
  appId: "1:668337844782:web:d75ae6097870e21efaa5bf",
  measurementId: "G-CM4WSEQJWE"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//initialize database
export const db=getDatabase(app);
//const analytics = getAnalytics(app);