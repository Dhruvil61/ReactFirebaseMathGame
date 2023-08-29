// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbUj7D-A5ZKnbl-BXn9cTlMZkqoM0pYJc",
  authDomain: "interviewtask-c04da.firebaseapp.com",
  databaseURL: "https://interviewtask-c04da-default-rtdb.firebaseio.com",
  projectId: "interviewtask-c04da",
  storageBucket: "interviewtask-c04da.appspot.com",
  messagingSenderId: "453037051581",
  appId: "1:453037051581:web:a34f3f4dd58d94487671d4",
  measurementId: "G-7Q0X5GG6GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();