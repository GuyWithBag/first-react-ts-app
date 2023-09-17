// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd1M-zQCITSs6aPIHGkpkDv5aFG-ss4u0",
  authDomain: "todo-app-df4b9.firebaseapp.com",
  projectId: "todo-app-df4b9",
  storageBucket: "todo-app-df4b9.appspot.com",
  messagingSenderId: "915633127652",
  appId: "1:915633127652:web:aa960ad7b59becc7906cf1",
  measurementId: "G-3GEB8CP77K"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFirestore(app)