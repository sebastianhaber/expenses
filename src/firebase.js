// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2ebpLTETSdMbhaDddOm1QB3q_HHyD3IM",
  authDomain: "expenses-be913.firebaseapp.com",
  projectId: "expenses-be913",
  storageBucket: "expenses-be913.appspot.com",
  messagingSenderId: "11225107206",
  appId: "1:11225107206:web:8cae2f05dc20397755ec87",
  measurementId: "G-XQKBD42B4X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = firebase.firestore();