import { UserContext } from "../Context/UserProvider";
import { useEffect, useState, useContext } from "react";

function CommentCard({ comment, onDeleteComment }) {
  let [user, setUser] = useContext(UserContext);

  function handleDeleteComment(comment) {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(onDeleteComment(comment));
  }

  function handleEditComment() {
    console.log("hey");
  }

  return (
    <div>
      <p>
        <img
          style={{ borderRadius: "50%", width: "3rem" }}
          src={user.profile_image}
        />{" "}
        {user.username} said: {comment.comment}
      </p>
      {user.username === comment.user.username ? (
        <div>
          <button onClick={handleEditComment}>Edit comment</button>
          <button onClick={() => handleDeleteComment(comment)}>
            Delete comment
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;
