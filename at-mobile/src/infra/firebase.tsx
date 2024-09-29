import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdw9Q7kxRCCN7cKfK_8RcXfTYODhPosiw",
  authDomain: "projeto3-74a15.firebaseapp.com",
  databaseURL: "https://projeto3-74a15-default-rtdb.firebaseio.com",
  projectId: "projeto3-74a15",
  storageBucket: "projeto3-74a15.appspot.com",
  messagingSenderId: "857534324572",
  appId: "1:857534324572:web:11c1ee2244f37166af6b99",
  measurementId: "G-1ZYR6CQVEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;