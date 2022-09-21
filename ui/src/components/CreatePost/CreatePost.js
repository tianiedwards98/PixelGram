import { useEffect, useState } from 'react';
import pixelgramLogo from '../../pixelgram-logo.png'
import logoLine from '../../logo-rect-2.png'
import './CreatePost.css'
import { useHistory } from 'react-router';
import Constants from '../../generic/constant'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

function CreatePost({changePage,authenticatedUser: user}) {
    const history = useHistory();
    const [username, setUsername] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [description, setDescription] = useState('');
    const [descMissingError, setDescMissingError] = useState(false);
    
    const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    const {name, value } = event.target;

   };

   const handleTextAreaChange = (event) => {
     event.preventDefault();
     setDescription(event.target.value);
   }


   async function uploadPost(event) {
      event.preventDefault();
       const auth_cookie = ( read_cookie('authToken'));
       const userName = ( read_cookie('userName'));
       //console.log(userName);
        let options = {
         headers: {
            'Authorization': 'Bearer '+auth_cookie,
          // 'Content-Type': 'multipart/form-data'
         },
         method: 'POST'
       };

        options.body = new FormData();
        options.body.append("createdBy",userName);
        options.body.append("message",description);
        options.body.append("imageUrl",selectedFile)

        const result = await fetch(Constants.POST_URL, options
                   ).then((response) => response.json())
                    .catch(console.log)
                    //.throws('Error');
               history.push('/');
     }


    return (
        <div className='createPost' data-testid='createPost-component'>
        <div className='createPost-container'>
          <div className='createPost-header'>
                              <img src={pixelgramLogo} className='Auth-logo' alt='Auth-logo'></img>
                              <img src={logoLine} className='Auth-logo-line' alt='pixel-logo-line'></img>
                              <h2>Create Post</h2>
          </div>
             <form className='createPost-form'>
             <div>
             <label htmlFor="uploadfilebtn" className="choose-image-button" data-testid='createPost-uploadfile-button'>Choose Image</label>
             <input type="file" id='uploadfilebtn' name="post-image-file" className="doNotShow" onChange={changeHandler}  />
             </div>
              {isFilePicked ? <p className='file-Name'>Filename: {selectedFile.name}</p> : (<p className='error-message'>*Image is required</p>)}
              <div className='desc-box-div'>
              <textarea className='createPost-DescriptionBox' placeholder='Description...' name='description' data-testid='createPost-DescBox' onChange={handleTextAreaChange}></textarea>
               {descMissingError ? <small className='error-message' data-testid='CreatePost-Desc-missing'>* Description is required</small> : null}
              </div>
              <div className='createPost-buttons'>
               <button className='cancel-button' data-testid='CreatePost-Cancel-Button'>Cancel</button>
               <button className='create-post-button' onClick={uploadPost} data-testid='Upload-Post-Button'>Create Post</button>
              </div>
             </form>
             </div>
         </div>

    );
}

export default CreatePost