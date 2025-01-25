// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8eSREl6KnZBZVQI7dIhP13pCt5LHesA0",
  authDomain: "finance-manager-89a72.firebaseapp.com",
  databaseURL: "https://finance-manager-89a72-default-rtdb.firebaseio.com",
  projectId: "finance-manager-89a72",
  storageBucket: "finance-manager-89a72.firebasestorage.app",
  messagingSenderId: "856061027796",
  appId: "1:856061027796:web:465e737e9ba6aac4c42241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database } 



