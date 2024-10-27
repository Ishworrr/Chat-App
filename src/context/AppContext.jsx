//for userdata and chat data
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); //store userdata
  const [chatData, setChatData] = useState(null); //store chatdtata

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      // console.log(userSnap);
      // console.log(userData);
      setUserData(userData);
      if (userData.avatar && userData.name) {
        //if available userData
        navigate("/chat");
        console.log(user);
      } else {
        navigate("/profile");
      }
      await updateDoc(userRef, {
        // lastSeen: new Date().toISOString(),
        lastSeen: Date.now(),
      });
      setInterval(async () => {
        if (auth.chatUser) {
          //if user is authenticated get time every 1min/ registered

          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {}
  };
  const value = {
    //passes here to access in any components
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
