//for userdata and chat data
import { doc, getDoc } from "firebase/firestore";
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null); //userdata
  const [chatData, setChatData] = useState(null); //chatdtata

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      console.log(userSnap);
    } catch (error) {}
  };
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
