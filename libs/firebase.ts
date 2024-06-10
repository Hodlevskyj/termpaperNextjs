// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH5JdCA4C8SIUTVv9knhMWQ8EkYoDumWs",
  authDomain: "termpapernextjs.firebaseapp.com",
  projectId: "termpapernextjs",
  storageBucket: "termpapernextjs.appspot.com",
  messagingSenderId: "547310380162",
  appId: "1:547310380162:web:30807b55fb0f6c262c809b",
  measurementId: "G-4XF8SLFMW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;