import './Comment.css';

function Comment ({ data: scopedComment }) {

    const { username, body } = scopedComment;

    return (
        <div className="post-card-comment-message-container" data-testid="Comment">
            <div className="post-card-comment-username" data-testid="Comment-username">
                {username}
            </div> 
            <div className="post-card-user-comment-content" data-testid="Comment-description">
                {body}
            </div>
        </div>
    )
}

export default Comment