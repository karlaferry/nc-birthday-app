import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/User";
import Picker from "emoji-picker-react";
import { postGreeting } from "../utils/dbCalls";

export default function MessageField({ id }) {
  const { user, isLoggedIn } = useContext(UserContext);
  const [emoji, setEmoji] = useState(null);
  const [message, setMessage] = useState("");

  const onEmojiClick = (e, emojiObject) => {
    setEmoji(emojiObject);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postGreeting(user.uid, emoji.emoji, message, id);
    setMessage("");
  };
  return (
    <div>
      <h2>Send an Anonymous Birthday Greeting:</h2>
      {isLoggedIn ? (
        <div>
          <h3>Pick Your Emoji:</h3>
          <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
          <p>{emoji && emoji.emoji}</p>
          <h3>Your Message</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Make them smile!"
              cols="50"
              rows="10"
              disabled={!isLoggedIn}
              onChange={handleMessage}
              value={message}
            />
            <br />
            <button disabled={!isLoggedIn}>Submit</button>
          </form>
        </div>
      ) : (
        <p>Please login or register to leave a greeting and view greetings.</p>
      )}
    </div>
  );
}
