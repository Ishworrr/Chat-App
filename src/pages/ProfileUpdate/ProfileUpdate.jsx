import React, { useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProfileUpdate = () => {
  const navigate = useNavigate(); //last,for else

  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState(""); //initialize bio with empty string
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && image) {
        //if prevImage is not available and user has not selected ny new image
        toast.error("Upload Profile Picture");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        //if user has image selected
        const imageUrl = await upload(image);
        setPrevImage(imageUrl);
        await updateDoc(docRef, {
          avatar: imageUrl,
          bio: bio,
          name: name,
        });
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          //if user have all these they will set them in this state. otherwise they will be empty
          //if user login in they will be sent here otherwise else
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar); //if user have avatar property available
        }
      } else {
        navigate("/");
      }
    });
  });
  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setBio(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.bio)}
            value={bio}
            placeholder="Write profile bio"
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt=""
        />
      </div>{" "}
    </div>
  );
};

export default ProfileUpdate;
