export default function CommentList({ comments }) {
  return (
    <>
      <ul>
        {comments?.map((comment) => {
          return (
            <>
              {comment.status === "approved" && (
                <li key={comment?.id}>{comment?.content}</li>
              )}
              {comment.status === "pending" && (
                <li key={comment?.id}>Comentário sendo moderado</li>
              )}
              {comment.status === "rejected" && (
                <li key={comment?.id}>Comentário rejeitado!</li>
              )}
            </>
          );
        })}
      </ul>
    </>
  );
}
