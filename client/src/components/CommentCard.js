import { UserContext } from "../Context/UserProvider";
import { useState, useContext } from "react";
import { Comment, Icon, Form, Button } from "semantic-ui-react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function CommentCard({ comment, onDeleteComment, onUpdateComment }) {
  let [user, setUser] = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(comment.rating);
  const [newComment, setNewComment] = useState(comment.comment);
  const [error, setError] = useState("");

  function handleDeleteComment(deletedComment) {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(onDeleteComment(deletedComment));
  }

  function handleEditComment() {
    setIsEditing(!isEditing);
  }

  function handleUpdate(e) {
    e.preventDefault();

    let updateComment = {
      rating: rating,
      comment: newComment,
    };

    fetch(`/comments/${comment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateComment),
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((updatedComment) => onUpdateComment(updatedComment))
          .then(handleEditComment);
      } else {
        res.json().then((error) => setError(error.errors));
      }
    });
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <Icon
            link
            id="closeIcon"
            name="close"
            onClick={() => handleEditComment(comment)}
          ></Icon>
          <Form onSubmit={handleUpdate}>
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
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></input>
            </Form.Field>
            <Button
              size="tiny"
              type="Submit"
              style={{ backgroundColor: "#98eb6b" }}
            >
              <Icon name="checkmark" /> Update
            </Button>
          </Form>
        </div>
      ) : (
        // <Comment.Group>
        <Comment>
          {/* {comment.created_at === comment.updated_at ? (
              <p>left at: {comment.created_at}</p>
            ) : (
              <p>updated at: {comment.updated_at}</p>
            )} */}
          <Comment.Avatar
            as={Link}
            to={`/users/${comment.user.id}`}
            src={comment.user.profile_image}
          />
          <Comment.Content>
            <Comment.Author>{comment.user.username}</Comment.Author>
            <Comment.Metadata>
              {comment.created_at === comment.updated_at ? (
                <div>left at: {comment.created_at}</div>
              ) : (
                <div>updated at: {comment.updated_at}</div>
              )}
            </Comment.Metadata>
            <Comment.Text>Rated: {"⭐️".repeat(comment.rating)}</Comment.Text>
            <Comment.Text>{comment.comment}</Comment.Text>
            {/* {user && user.username === comment.user.username && !isEditing ? (
                <div>
                  <button onClick={() => handleEditComment(comment)}>
                    Edit comment
                  </button>
                  <button onClick={() => handleDeleteComment(comment)}>
                    Delete comment
                  </button>
                </div>
              ) : null} */}
            {user && user.username === comment.user.username && !isEditing ? (
              <Comment.Actions>
                <Comment.Action onClick={() => handleEditComment(comment)}>
                  <Icon name="edit" />
                  Edit
                </Comment.Action>
                <Comment.Action onClick={() => handleDeleteComment(comment)}>
                  <Icon name="trash alternate" />
                  Delete
                </Comment.Action>
              </Comment.Actions>
            ) : null}
          </Comment.Content>
          {/* <img
              style={{ borderRadius: "50%", width: "3rem" }}
              src={comment.user.profile_image}
            /> */}
          {/* <p>Rated: {"⭐️".repeat(comment.rating)}</p>
            <p>
              {comment.user.username} said: {comment.comment}
            </p> */}
        </Comment>
        // </Comment.Group>
      )}
      {/* {user && user.username === comment.user.username && !isEditing ? (
        <div>
          <button onClick={() => handleEditComment(comment)}>
            Edit comment
          </button>
          <button onClick={() => handleDeleteComment(comment)}>
            Delete comment
          </button>
        </div>
      ) : null} */}
      {error
        ? error.map((err) => (
            <div className="errors">
              <Icon name="warning circle"></Icon>
              {err}
            </div>
          ))
        : null}
    </div>
  );
}

export default CommentCard;
