import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/User";
import Picker, { SKIN_TONE_MEDIUM_LIGHT } from "emoji-picker-react";

export default function MessageField() {
  const { isLoggedIn } = useContext(UserContext);
  const [emoji, setEmoji] = useState(null);
  const [message, setMessage] = useState("");

  const onEmojiClick = (e, emojiObject) => {
    setEmoji(emojiObject);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
  };
  return (
    <div>
      <h2>Send an Anonymous Birthday Greeting:</h2>
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
  );
}
