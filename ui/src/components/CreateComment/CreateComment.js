import './CreateComment.css'
import arrowButton from '../../comment-arrow.png'
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import Constants from '../../generic/constant';

function CreateComment({ postId, currentUser, addComment }) {

    const [commentContent, setCommentContent] = useState("");
    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event){
        setCommentContent(event.target.value);
        setInputValue(event.target.value);
    }

    function handleFormSubmit(event){
        event.preventDefault();
        if(commentContent !== ''){
            fetch(Constants.CREATE_COMMENT_URL + `/${postId}/comments`, {
                method:"POST",
                headers:{
                    'Authorization': 'Bearer ' + currentUser.token.access_token,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({username: currentUser.username, body: commentContent})
            })
              .then((response) => response.text())
              .catch(console.log)
              setInputValue("")
            addComment(currentUser.username, commentContent);
        }
    }

    return (
        <div className="create-comment-container">
            <form className="create-comment-form" onSubmit={handleFormSubmit}>
                <input value={inputValue} data-testid="create-comment-body" className="create-comment-input" placeholder="Add a comment..." onChange={handleInputChange}></input>
                <button data-testid="create-comment-button" type="submit" className="create-comment-button"><img src={arrowButton} className="create-comment-button-arrow"/></button>
            </form>
        </div>
    )
}

export default CreateComment;