import CommentCard from "./CommentCard";

function CommentList({ displayedComments, onDeleteComment }) {
  return (
    <div>
      {displayedComments
        ? displayedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDeleteComment={onDeleteComment}
            />
          ))
        : "Loading.."}
    </div>
  );
}

export default CommentList;
