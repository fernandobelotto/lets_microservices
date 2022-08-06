export default function CommentList({ comments }) {

    return (
            <>
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>{comment.content}</li>
                        )
                    })}
                </ul>
            </>
    )

}