import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth/cordova";

//gs
const firebaseConfig = {
  apiKey: "AIzaSyBfQJZmMRDRhBTcpCOD4WLi7vn8CJtG4eE",
  authDomain: "chat-app-gs-a7831.firebaseapp.com",
  projectId: "chat-app-gs-a7831",
  storageBucket: "chat-app-gs-a7831.appspot.com",
  messagingSenderId: "750768140912",
  appId: "1:750768140912:web:9904949bdcf27232893ab5",
};

//2
// const firebaseConfig = {
//   apiKey: "AIzaSyAOAHN1hoaWiyhdLz-ttLNmElORgRJq1tw",
//   authDomain: "chat-app-2-6abf1.firebaseapp.com",
//   projectId: "chat-app-2-6abf1",
//   storageBucket: "chat-app-2-6abf1.firebasestorage.app",
//   messagingSenderId: "540197324535",
//   appId: "1:540197324535:web:18818b9e440855b33a35f2",
// };

//react-chat
// const firebaseConfig = {
//   apiKey: "AIzaSyD47_U4Tpn7W6F4EnppyoYJkwEpZCI_1Co",
//   authDomain: "reactchat-6881c.firebaseapp.com",
//   projectId: "reactchat-6881c",
//   storageBucket: "reactchat-6881c.appspot.com",
//   messagingSenderId: "382456954332",
//   appId: "1:382456954332:web:c4896788a420c68effa319",
// };

//space
// const firebaseConfig = {
//   apiKey: "AIzaSyBcUurdp2yhAx9IicY6i-T2Jl8rGrCGtDs",
//   authDomain: "chat-app-3-25816.firebaseapp.com",
//   projectId: "chat-app-3-25816",
//   storageBucket: "chat-app-3-25816.firebasestorage.app",
//   messagingSenderId: "480350437779",
//   appId: "1:480350437779:web:40a5d926309b8bf5a86866",
// };

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
      chatsData: [],
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

const resetPass = async (email) => {
  if (!email) {
    toast.error("Please enter your email");
    return null;
  }
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email)); //if userid = userid from paramter
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      //if querySnap is not empty
      await sendPasswordResetEmail(auth, email);
      toast.success("Reser Email Snet");
    } else {
      toast.error("email does not exist");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

export { signup, login, logout, auth, db, resetPass };
