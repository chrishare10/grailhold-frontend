import CommentsListWrapper from "./CommentsListWrapper"
import CommentsBuilder from "./CommentsBuilder"

export default function CommentsContainer({entryId, comments, userId, username, email, characters}) {
   
    
    return <div className={`bg-gray-100 p-5 flex flex-col gap-5`}>
            {userId ? <CommentsBuilder entryId={entryId} userId={userId} username={username} email={email} characters={characters} /> : null }
            {comments.length ? <CommentsListWrapper entryId={entryId} comments={comments} userId={userId}/> : null}
            {comments.length || userId ? null : <p>no comments</p>}
        </div>
}