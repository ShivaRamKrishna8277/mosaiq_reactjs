import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhxQ-tuRmGI8ApPLa7NKt1LJhoi7FtF7U",
    authDomain: "mosaiq-a5502.firebaseapp.com",
    projectId: "mosaiq-a5502",
    storageBucket: "mosaiq-a5502.appspot.com",
    messagingSenderId: "396573861154",
    appId: "1:396573861154:web:8bf869c8bca2f72c38b17b",
    measurementId: "G-ZRWDPG49WK",
    databaseURL: "https://mosaiq-a5502-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);