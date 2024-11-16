// import React, { useContext, useEffect, useState } from "react";
// import "./LeftSidebar.css";
// import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { AppContext } from "../../context/AppContext";
// import { db } from "../../config/firebase";
// import { toast } from "react-toastify";

// const LeftSidebar = () => {
//   const navigate = useNavigate();
//   const {
//     userData,
//     chatData,
//     chatUser,
//     setChatUser,
//     setMessageId,
//     messagesId,
//     chatVisible,
//     setChatVisible,
//   } = useContext(AppContext);
//   const [user, setUser] = useState(null); //2state variables
//   const [showSearch, setShowSearch] = useState(false);

//   const inputHandler = async (e) => {
//     try {
//       const input = e.target.value;
//       if (input) {
//         setShowSearch(true);
//         const userRef = collection(db, "users");
//         const q = query(userRef, where("username", "==", input.toLowerCase()));
//         const querySnap = await getDocs(q);
//         if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
//           //-if not empty, navigate to the user's profile, and dattaid is not equal to userid
//           //-console.log(querySnap.docs[0].data());

//           // -  navigate(`/profile/${querySnap.docs[0].data().id}`);

//           let userExist = false;
//           chatData.map((user) => {
//             if (user.rId === querySnap.docs[0].data().id) {
//               userExist = true;
//             }
//           });
//           if (!userExist) {
//             //-if userExist==true;
//             setUser(querySnap.docs[0].data());
//           }

//           //-search user and get user with setShowSearch(true)
//         } else {
//           setUser(null);
//           //-if no user
//         }
//       } else {
//         setShowSearch(false);
//         //-if nothing entered setShowSearch(false)
//       }
//     } catch (error) {
//       console.error("Error in inputHandler:", error);
//     }
//   };
//   const addChat = async () => {
//     const messagesRef = collection(db, "messages");
//     const chatsRef = collection(db, "chats");
//     try {
//       const newMessageRef = doc(messagesRef);
//       await setDoc(newMessageRef, {
//         createAt: serverTimestamp(),
//         messages: [],
//       });
//       await updateDoc(doc(chatsRef, user.id), {
//         chatsData: arrayUnion({
//           messageId: newMessageRef.id,
//           lastMessage: "",
//           rId: userData.id,
//           updatedAt: Date.now(),
//           messageSeen: true,
//         }),
//       });
//       await updateDoc(doc(chatsRef, userData.id), {
//         chatsData: arrayUnion({
//           messageId: newMessageRef.id,
//           lastMessage: "",
//           rId: user.id,
//           updatedAt: Date.now(),
//           messageSeen: true,
//         }),
//       });
//       const uSnap = await getDoc(doc(db, "users", user.id));
//       const uData = uSnap.data();
//       setChat({
//         messagesId: newMessageRef.id,
//         lastMessage: "",
//         rId: user.id,
//         updatedAt: Date.now(),
//         messageSeen: true,
//         userData: uData,
//       });
//       setShowSearch(false);
//       setChatVisible(true);
//     } catch (error) {
//       toast.error(error.message);
//       console.error(error);
//     }
//   };

//   const setChat = async (item) => {
//     try {
//       setMessageId(item.messageId);
//       setChatUser(item);
//       const userChatsRef = doc(db, "chats", userData.id);
//       const userChatsSnapshot = await getDoc(userChatsRef);
//       const userChatsData = userChatsSnapshot.data();
//       const chatIndex = userChatsData.chatsData.findIndex(
//         (c) => c.mesageId === item.messageId
//       );
//       userChatsData.chatsData[chatIndex].messageSeen = true;
//       await updateDoc(userChatsRef, {
//         chatData: userChatsData.chatsdata,
//       });
//       setChatVisible(true);
//     } catch (error) {
//       toast.error(error.message);
//     }
//     // console.log(item);
//   };

//   useEffect(() => {
//     const updateChatUserData = async () => {
//       if (chatUser) {
//         const userRef = doc(db, "users", chatUser.userData.id);
//         const userSnap = await getDoc(userRef);
//         const userData = userSnap.data();
//         setChatUser((prev) => ({
//           ...prev,
//           userData: userData,
//         }));
//       }
//     };
//     updateChatUserData();
//   }, [chatData]);
//   return (
//     <div className={`ls ${chatVisible ? "hidden" : ""}`}>
//       <div className="ls-top">
//         <div className="ls-nav">
//           <img src={assets.logo} className="logo" alt="" />
//           <div className="menu">
//             <img src={assets.menu_icon} alt="" />
//             <div className="sub-menu">
//               <p onClick={() => navigate("/profile")}>Edit Profile</p>
//               <hr />
//               <p>Logout</p>
//             </div>
//           </div>
//         </div>
//         <div className="ls-search">
//           <img src={assets.search_icon} alt="" />
//           <input onChange={inputHandler} type="text" placeholder="Search" />
//         </div>
//       </div>
//       <div className="ls-list">
//         {showSearch && user ? ( //showSearch is true and userdata is available
//           <div onClick={addChat} className="friends add-user">
//             <img src={user.avatar} alt="" />
//             <p>{user.name}</p>
//           </div>
//         ) : (
//           chatData.map((item, index) => (
//             <div
//               onClick={() => setChat(item)}
//               key={index}
//               className={`friends ${
//                 item.messageSeen || item.messageId === messagesId
//                   ? ""
//                   : "border"
//               }`}
//             >
//               <img src={item.userData.avatar} alt="" />
//               <div>
//                 <p>{item.userData.name}</p>
//                 <span>{item.lastMessage}</span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

import React, { useContext, useEffect, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppContext } from "../../context/AppContext";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
    chatVisible,
    setChatVisible,
  } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        let foundUser = null;

        querySnap.forEach((docSnap) => {
          const uData = docSnap.data();
          if (uData.id !== userData.id) {
            foundUser = uData;
          }
        });

        setUser(foundUser);
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Error in inputHandler:", error);
    }
  };

  const addChat = async () => {
    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: userData.id,
        updatedAt: Date.now(),
        messageSeen: true,
      };

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion(chatData),
      });
      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion(chatData),
      });

      const uSnap = await getDoc(doc(db, "users", user.id));
      const uData = uSnap.data();
      setChat({
        ...chatData,
        userData: uData,
      });

      setShowSearch(false);
      setChatVisible(true);
    } catch (error) {
      toast.error("Failed to add chat: " + error.message);
      console.error(error);
    }
  };

  const setChat = async (item) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);

      const userChatsRef = doc(db, "chats", userData.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      const userChatsData = userChatsSnapshot.data();

      const chatIndex = userChatsData.chatsData.findIndex(
        (c) => c.messageId === item.messageId
      );

      if (chatIndex !== -1) {
        userChatsData.chatsData[chatIndex].messageSeen = true;
        await updateDoc(userChatsRef, {
          chatsData: userChatsData.chatsData,
        });
      }

      setChatVisible(true);
    } catch (error) {
      toast.error("Error setting chat: " + error.message);
    }
  };

  useEffect(() => {
    if (chatUser) {
      const updateChatUserData = async () => {
        try {
          const userRef = doc(db, "users", chatUser.userData.id);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          setChatUser((prev) => ({
            ...prev,
            userData: userData,
          }));
        } catch (error) {
          console.error("Error updating chat user data:", error);
        }
      };
      updateChatUserData();
    }
  }, [chatUser]);

  return (
    <div className={`ls ${chatVisible ? "hidden" : ""}`}>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input onChange={inputHandler} type="text" placeholder="Search" />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData?.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              key={index}
              className={`friends ${
                item.messageSeen || item.messageId === messagesId
                  ? ""
                  : "border"
              }`}
            >
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
