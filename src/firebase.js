// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBq2rMnM2a-SahSVxfWuzasnEM1ltgHxzw',
  authDomain: "vue-project-3797a.firebaseapp.com",
  projectId: "vue-project-3797a",
  storageBucket: "vue-project-3797a.appspot.com",
  messagingSenderId: "102386394857",
  appId: "1:102386394857:web:99035a5624cfef26083278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)