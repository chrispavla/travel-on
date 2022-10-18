import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";

function CommentForm({ clickedCard, onSubmitComments }) {
  let [user, setUser] = useContext(UserContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();

    let newComment = {
      rating: rating,
      comment: comment,
      user_id: user.id,
      point_of_interest_id: clickedCard.id,
    };

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((comment) => onSubmitComments(comment));
      }
    });
    setComment("");
    setRating("");
  }

  return (
    <div>
      <h4>Leave your comment</h4>
      <form onSubmit={handleSubmitForm}>
        <label>Place rating</label>
        <input
          min="0"
          max="5"
          step="0.5"
          list="tickmarks"
          type="range"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        ></input>
        <label>Your comment</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button type="submit">Submit comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
