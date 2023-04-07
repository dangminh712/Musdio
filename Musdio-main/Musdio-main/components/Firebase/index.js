import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCoX-FtTXOHj_IcZ6riFi3vjLc9LLw8fqo",
  authDomain: "musdio-6ec90.firebaseapp.com",
  databaseURL: "https://musdio-6ec90-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "musdio-6ec90",
  storageBucket: "musdio-6ec90.appspot.com",
  messagingSenderId: "475042913625",
  appId: "1:475042913625:web:838e09d87446e0d7660048",
  measurementId: "G-KWVQE6ZDZE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)






