// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blog-hello-dev.firebaseapp.com",
  projectId: "blog-hello-dev",
  storageBucket: "blog-hello-dev.appspot.com",
  messagingSenderId: "688579004336",
  appId: "1:688579004336:web:4f161bc4360531e2573875",
  measurementId: "G-51MN3GCSMB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
