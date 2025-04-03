// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWdkugnMGUOTgG126RZgHN22LVGfjsP2o",
  authDomain: "my-app-cc7fa.firebaseapp.com",
  projectId: "my-app-cc7fa",
  storageBucket: "my-app-cc7fa.firebasestorage.app",
  messagingSenderId: "13288458490",
  appId: "1:13288458490:web:daed448a3e065a6a0aa143",
  measurementId: "G-19M9XSJTCH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
