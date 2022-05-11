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
  // console.log(user.emailVerified);

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
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteAccount(user.uid);
      window.open("/", "_self");
    }
  };

  const handleDeleteGreeting = async (timestamp) => {
    const commentId = user.uid + timestamp;
    setSentGreetings((curr) => {
      const arr = curr.filter((message) => {
        const id = message.authorId + message.timestamp;
        return id !== commentId;
      });
      return arr;
    });
    await deleteGreeting(user.uid, timestamp);
    alert("Greeting deleted!");
  };

  const displayGreetings = () => {
    return sentGreetings.length > 0 ? (
      sentGreetings.map((greeting) => {
        const { day, month, year, hours, minutes } = convertDate(
          greeting.timestamp
        );
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
            <form
              action="/dashboard"
              onSubmit={(e) => {
                e.preventDefault();
                handleDeleteGreeting(greeting.timestamp);
              }}
            >
              <button>🗑</button>
            </form>
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
          {/* DASHBOARD */}
          <h2>Dashboard</h2>
          <h3>Welcome, {userData.first_name}!</h3>
          {/* ACCOUNT INFO */}
          <h2>Account Info</h2>
          <img src={`${userData.avatar_url}`} alt="user default" />
          <p>Name: {userData.first_name}</p>
          <p>Email: {user.email}</p>
          {/* UPLOAD NEW AVATAR */}
          <form onSubmit={handleUpload}>
            <label>Change Avatar:</label>
            <input type="file" accept="image/*" onChange={handleFile} />
            <button>Upload</button>
          </form>
          <br />
          {/* GO TO USER BIRTHDAY PAGE */}
          <button onClick={() => navigate(`/celebrant/${user.uid}`)}>
            My Birthday Page
          </button>
          {/* SENT GREETINGS */}
          <h2>Sent Greetings</h2>
          {displayGreetings()}
          {/* DELETE ACCOUNT */}
          <h2>Delete Account</h2>
          <p>Your account information and data will be wiped.</p>
          {/* <form> */}
          <button onClick={handleDelete}>Delete Account</button>
          {/* </form> */}
        </>
      ) : (
        <p>Please login or register.</p>
      )}
    </div>
  );
}
