// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGv_tGAHrrpfGLgdQ9qQXL-7Z26Ue5RHE",
    authDomain: "crud-project-92ef9.firebaseapp.com",
    projectId: "crud-project-92ef9",
    storageBucket: "crud-project-92ef9.appspot.com",
    messagingSenderId: "296388072333",
    appId: "1:296388072333:web:6f5ea2cb323257d2eb63c4",
    measurementId: "G-TF4YME0JC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth };
