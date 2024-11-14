//for userdata and chat data
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); //store userdata
  const [chatData, setChatData] = useState(null); //store chatdtata
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

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
        // console.log(user);
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

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatsData;
        // console.log(chatItems);
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updateAt - a.updateAt));
      });
      return () => {
        unSub();
      };
    }
  });
  const value = {
    //passes here to access in any components
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
    chatUser,
    setChatUser,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
