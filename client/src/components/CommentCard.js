import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";

function CommentCard({ comment, onDeleteComment, onUpdateComment }) {
  let [user, setUser] = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(comment.rating);
  const [newComment, setNewComment] = useState(comment.comment);

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
      }
    });
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <button onClick={() => handleEditComment(comment)}>Cancel</button>
          <form onSubmit={handleUpdate}>
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
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></input>
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <div>
          <img
            style={{ borderRadius: "50%", width: "3rem" }}
            src={comment.user.profile_image}
          />
          <p>Rated: {"⭐️".repeat(comment.rating)}</p>
          <p>
            {comment.user.username} said: {comment.comment}
          </p>
        </div>
      )}
      {user.username === comment.user.username && !isEditing ? (
        <div>
          <button onClick={() => handleEditComment(comment)}>
            Edit comment
          </button>
          <button onClick={() => handleDeleteComment(comment)}>
            Delete comment
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;
