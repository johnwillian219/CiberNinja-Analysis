// src/components/library/Comments/CommentList.jsx
import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
