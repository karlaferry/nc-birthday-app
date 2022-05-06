import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/User";
import Picker from "emoji-picker-react";
import { postGreeting } from "../utils/dbCalls";

export default function MessageField({ id, setCelebGreetings }) {
	const { user, isLoggedIn } = useContext(UserContext);
	const [emoji, setEmoji] = useState(null);
	const [message, setMessage] = useState("");
	const [emojiErr, setEmojiErr] = useState(null);
	const [bodyErr, setBodyErr] = useState(null);

	useEffect(() => {
		setEmojiErr(null);
		setBodyErr(null);
	}, []);

	const onEmojiClick = (e, emojiObject) => {
		setEmojiErr(null);
		setEmoji(emojiObject);
	};

	const handleMessage = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!message) {
				setBodyErr("Please enter a message.");
			} else if (emoji === null) {
				setEmojiErr("Please pick an emoji.");
			} else {
				const timestamp = Date.now();
				setCelebGreetings((curr) => {
					const arr = [
						{
							authorId: user.uid,
							timestamp,
							emoji: emoji.emoji,
							message,
							celebId: id,
						},
						...curr,
					];
					return arr;
				});
				await postGreeting(user.uid, emoji.emoji, message, id, timestamp);
				setMessage("");
				setEmoji(null);
			}
		} catch (e) {
			if (e.toString().includes("emoji")) {
				setEmojiErr("Please pick an emoji.");
			}
		}
	};
	return (
		<div>
			<h2>Send an Anonymous Birthday Greeting:</h2>
			{isLoggedIn ? (
				<div>
					<h3>Pick Your Emoji:</h3>
					<Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
					{emojiErr && <p>{emojiErr}</p>}
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
						{bodyErr && <p>{bodyErr}</p>}
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
