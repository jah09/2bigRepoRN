import firebase from 'firebase/compat-app';
import {getDatabase} from 'firebase/firebase';

const firebaseConfig={
    apiKey: "AIzaSyC3EK1x68TgLdB7wIgpQ9bssBU4jnN7EVs",
    authDomain: "big-system-64b55.firebaseapp.com",
    databaseURL: "https://big-system-64b55-default-rtdb.firebaseio.com",
    projectId: "big-system-64b55",
    storageBucket: "big-system-64b55.appspot.com",
    messagingSenderId: "668337844782",
    appId: "1:668337844782:web:d75ae6097870e21efaa5bf",
    measurementId: "G-CM4WSEQJWE"
}

if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig)
}

const db=getDatabase();
 