import React, { useState, useEffect } from 'react';
import placeholderPFP from '../../default-pfp.png'
import './Post.css';
import '../../index.css';
import Comment from '../Comment/Comment'
import Constants from '../../generic/constant'
import CreateComment from '../CreateComment/CreateComment'

function Post ({ data: scopedPost, user }) {
  const [username, setUsername] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [profilePicLink, setProfilePicLink] = useState("");
  const [truncatedDescription, setTruncatedDescription] = useState("");
  const [post, setPost] = useState(scopedPost);
  const [comments, setComments] = useState(scopedPost.comments);
  const [commentCount, setCommentCount] = useState(scopedPost.commentCount)

  var isLinkAnImage = function(uri) {

    //make sure we remove any nasty GET params
    uri = uri.split('?')[0];
    //moving on, split the uri into parts that had dots before them
    var parts = uri.split('.');
    //get the last part (should be the extension)
    var extension = parts[parts.length-1];
    //define some image types to test against
    var imageTypes = ['jpg','jpeg','tiff','png','gif','bmp'];
    //check if the extension matches anything in the list
    if(imageTypes.indexOf(extension) !== -1) {
        return true;   
    }
}

function handleCreateComment(username, body){
  const newComment = {
    username: username,
    body: body
  }
  setCommentCount(commentCount + 1);
  setComments([...comments, newComment]);
}

function handleCurrentPostCommentsUpdate(curPagComments) {
  curPagComments.filter(comment => comment !== undefined)
  curPagComments.forEach(comment => {
    comment.index = comments[comments.length - 1].index + 1
  });
  setComments(comments.concat(curPagComments));
}

function handleMoreCommentClick(){
  const index = comments[comments.length - 1].index + 1;
  const id = post.id
    fetch(Constants.POST_URL + `/${id}/comments?${new URLSearchParams({
      pageNumber: index,
      pageSize: 5
    })}`)
    .then((response) => response.json())
    .then((result) => handleCurrentPostCommentsUpdate(result.content))
    .catch(console.log);

}

  useEffect(() => {
    setUsername(post.createdBy.username);
    setProfilePicLink(post.createdBy.profileImageUrl);
    setImageLink(post.imageUrl);
    setTruncatedDescription(post.message.length > 140 ? post.message.substring(0, 140).trim() + "..." : post.message);
  }, [post, imageLink, profilePicLink]);

  return (
    <>
      <div className="Post" data-testid="Post">
        <div className="post-card">
          <div className="post-card-header">
            <span className="post-card-header-profile-picture-container">
              <img className="post-card-header-profile-picture" src={isLinkAnImage(profilePicLink) ? profilePicLink : placeholderPFP} alt="PFP" height="40px" width="40px"/>
            </span>
            <div className="post-card-username" data-testid="Post-username">
              &nbsp;&nbsp;{username}
            </div>
          </div>
          <div className="post-card-body">
            <img src={imageLink} 
              alt="user's post" style={{margin:"auto", padding:"auto", maxHeight: '100%', maxWidth: '100%'}}
            />
          </div>
          <div className="post-card-footer">
            <div className="post-card-like-and-comment-container">
              <div className="post-card-comment-count">
                {commentCount} comment{post.commentCount !== 1 ?"s" :""}
              </div>
            </div>
            <div className="post-card-post-message-container">
              <div className="post-card-username" data-testid="Post-username">
                {username}
              </div> 
              <div className="post-card-user-message-content" data-testid="Post-description">
                {truncatedDescription}
              </div>
              {/* Displays the more button if the truncated description does not match the original post message */}
              {truncatedDescription !== post.message ? <button className="post-user-message-more" data-testid="post-footer-more" onClick={() => setTruncatedDescription(post.message)}>more</button> : ""}
            </div>
            <div className="post-card-comments-container">
              { commentCount - comments.length > 0 
              ? <input data-testid="view-more-comments" type='button' value='View more comments' className='view-more-comments' onClick={handleMoreCommentClick}/>
              : null
              }
              {comments?.map((comment) => (<Comment data={comment} key={comment.id} data-testid="Comment"/>))}
            </div>
            <div className="create-comment-component-container">
              {user !== null 
              ? <CreateComment postId={post.id} currentUser={user} addComment={handleCreateComment}/>
              : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
