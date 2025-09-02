// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSHoEBfO1Kl8DF41qyaFAtBYap4BcdKsY",
  authDomain: "recepti-za-ukusne-obroke-b007a.firebaseapp.com",
  databaseURL: "https://recepti-za-ukusne-obroke-b007a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recepti-za-ukusne-obroke-b007a",
  storageBucket: "recepti-za-ukusne-obroke-b007a.firebasestorage.app",
  messagingSenderId: "603096623591",
  appId: "1:603096623591:web:aa60b046edaf8d55b57542",
  measurementId: "G-S1TKF7DC1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);