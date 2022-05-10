import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../Contexts/User";
import {
  deleteAccount,
  patchUserAvatar,
  getSentGreetings,
  deleteGreeting,
} from "../utils/dbCalls";
import { convertDate } from "../utils/helperFuncs";

export default function Dashboard() {
  const { user, isLoggedIn, userData } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [sentGreetings, setSentGreetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPage() {
      const sent = await getSentGreetings(user.uid);
      setSentGreetings((curr) => {
        const arr = [];
        for (let greeting in sent) {
          arr.push(sent[greeting]);
        }
        return arr.reverse();
      });
    }
    loadPage();
  }, [user.uid]);

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

  const handleDelete = async () => {
    await deleteAccount(user.uid);
    alert("Sorry to see you go!");
    window.location.reload();
  };

  const displayGreetings = () => {
    return sentGreetings.length > 0 ? (
      sentGreetings.map((greeting) => {
        const { day, month, year, hours, minutes } = convertDate(
          greeting.timestamp
        );
        // FIX DELETE GREETING
        const handleDeleteGreeting = async () => {
          // setSentGreetings((curr) => {
          // 	const arr = [];
          // 	for (let greet of curr) {
          // 		if (curr[greet].timestamp !== greeting.timestamp) {
          // 			arr.push(curr[greet]);
          // 		}
          // 	}
          // 	return arr;
          // });
          await deleteGreeting(user.uid, greeting.timestamp);
          alert("Greeting deleted!");
        };
        return (
          <React.Fragment key={greeting.timestamp}>
            <p>
              {greeting.emoji} – {greeting.message}
            </p>
            <Link to={`/celebrant/${greeting.celebId}`}>
              <p>
                {day}-{month}-{year} | {hours}:{minutes}
              </p>
            </Link>
            <button onClick={handleDeleteGreeting}>🗑</button>
          </React.Fragment>
        );
      })
    ) : (
      <p>You haven't left any greetings yet.</p>
    );
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
          <h2>Sent Greetings</h2>
          {displayGreetings()}
          <h2>Delete Account</h2>
          <p>Your account information and data will be wiped.</p>
          <button onClick={handleDelete} href="/">
            Delete Account
          </button>
        </>
      ) : (
        <p>Please login or register.</p>
      )}
    </div>
  );
}
