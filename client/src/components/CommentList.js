import CommentCard from "./CommentCard";
import { Comment, Icon } from "semantic-ui-react";

function CommentList({ displayedComments, onDeleteComment, onUpdateComment }) {
  return (
    <div>
      {displayedComments
        ? displayedComments.map((comment) => (
            <Comment.Group>
              <CommentCard
                key={comment.id}
                comment={comment}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
              />
            </Comment.Group>
          ))
        : "Loading.."}
    </div>
  );
}

export default CommentList;
