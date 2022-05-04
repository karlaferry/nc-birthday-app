import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../Contexts/User";
import { patchUserAvatar } from "../utils/dbCalls";

export default function Dashboard() {
  const { user, isLoggedIn, userData } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const image = e.target.files[0];
    image && setAvatar(image);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (avatar === null) return;
    const imageRef = ref(storage, `user_avatars/${user.uid}`);
    await uploadBytes(imageRef, avatar);
    await patchUserAvatar(user.uid);
    alert("Image successfully uploaded.");
    window.location.reload();
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <>
          <h2>Dashboard</h2>
          <h3>Welcome, {userData.first_name}!</h3>
          <h2>Account Info</h2>
          <img src={`${userData.avatar_url}`} alt="user default" />
          <p>Name: {userData.first_name}</p>
          <p>Email: {user.email}</p>
          <form onSubmit={handleUpload}>
            <label>Change Avatar:</label>
            <input type="file" accept="image/*" onChange={handleFile} />
            <button>Upload</button>
          </form>
          <br />
          <button onClick={() => navigate(`/celebrant/${user.uid}`)}>
            My Birthday Page
          </button>
        </>
      ) : (
        <p>Please login or register.</p>
      )}
    </div>
  );
}
