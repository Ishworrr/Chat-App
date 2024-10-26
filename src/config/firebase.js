import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyBfQJZmMRDRhBTcpCOD4WLi7vn8CJtG4eE",
  authDomain: "chat-app-gs-a7831.firebaseapp.com",
  projectId: "chat-app-gs-a7831",
  storageBucket: "chat-app-gs-a7831.appspot.com",
  messagingSenderId: "750768140912",
  appId: "1:750768140912:web:9904949bdcf27232893ab5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //initilize with app instance
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user; //store user data in variable
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: email,
      name: "",
      avatar: "",
      bio: "Hey, there I am using a chat-app",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};

export { signup, login, logout, auth, db };
