import { useState, useContext } from "react";
import { UserContext } from "../Context/UserProvider";
// import { Rating } from "semantic-ui-react";
import Rating from "@mui/material/Rating";
import { Modal, Button, Header, Form, Icon } from "semantic-ui-react";

function CommentForm({ clickedCard, onSubmitComments, setShowAddCommentForm }) {
  let [user, setUser] = useContext(UserContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

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
        res.json().then((comment) => {
          onSubmitComments(comment);
          setShowAddCommentForm(false);
        });
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });
    setComment("");
    setRating("");
  }

  return (
    <div>
      {user ? (
        <div>
          <Form onSubmit={handleSubmitForm}>
            <Form.Field>
              <label>Place rating</label>
              <Rating
                step="1"
                type="range"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Rating>
            </Form.Field>
            <Form.Field>
              <label>Your comment</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></input>
            </Form.Field>
            <Button
              size="tiny"
              type="Submit"
              style={{ backgroundColor: "#98eb6b" }}
            >
              <Icon name="checkmark" /> Submit
            </Button>
            {error ? error.map((err) => <div>{err}</div>) : null}
          </Form>
        </div>
      ) : (
        <div>
          <h4>Want to leave a comment?</h4>
          <a href="/login">Log in</a>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
