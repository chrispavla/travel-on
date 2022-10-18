import CommentCard from "./CommentCard";

function CommentList({ displayedComments, onDeleteComment, onUpdateComment }) {
  return (
    <div>
      {displayedComments
        ? displayedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
            />
          ))
        : "Loading.."}
    </div>
  );
}

export default CommentList;
