// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKYupFRwV6OAtalNRlpBrmrcHR1dpiVIM",
  authDomain: "authentication-47596.firebaseapp.com",
  databaseURL: "https://authentication-47596-default-rtdb.firebaseio.com",
  projectId: "authentication-47596",
  storageBucket: "authentication-47596.appspot.com",
  messagingSenderId: "467930929762",
  appId: "1:467930929762:web:3a820ffeded6bf2673cf3b",
  measurementId: "G-2J31C1G1CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;