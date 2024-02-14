// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "KEY_FIREBASE",
  authDomain: "react-auth-aeb0b.firebaseapp.com",
  databaseURL: "https://react-auth-aeb0b-default-rtdb.firebaseio.com",
  projectId: "react-auth-aeb0b",
  storageBucket: "react-auth-aeb0b.appspot.com",
  messagingSenderId: "476340724783",
  appId: "1:476340724783:web:ec870b391b120d37dd52da",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
export { app };
