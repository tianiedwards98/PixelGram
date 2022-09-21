import { useEffect, useState } from 'react';
import pixelgramLogo from '../../pixelgram-logo.png'
import logoLine from '../../logo-rect-2.png'
import './Register.css'
import { useHistory } from 'react-router';
import Constants from '../../generic/constant'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


function Register({onRegister,changePage}) {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(null);
    const [userObject, setUserObject] = useState(null);
    const [usernameMissingErrorRegister, setUsernameMissingErrorRegister] = useState(false);
    const [passwordMissingErrorRegister, setPasswordMissingErrorRegister] = useState(false);
    const [userNameAlreadyExistsError, setUserNameAlreadyExistsError] = useState(false);

   useEffect(() => {

           if(authToken == null){
               return;
           } else if(authToken.access_token){
               onRegister(authToken)
               bake_cookie('authToken', authToken.access_token);
               bake_cookie('userName', username);
               history.push('/');
           } else{
               if(password !== '' && username !== ''){
                  setUserNameAlreadyExistsError(true)
               }
           }
       }, [authToken, userObject])



    function handleFormChange(event){
        event.preventDefault();

        const {name, value } = event.target;
        switch(name){
            case 'username':
                if (value !== ''){
                    setUsername(value);
                    setUsernameMissingErrorRegister(false);
                } else if(!usernameMissingErrorRegister) {
                    setUsername('');
                    setUsernameMissingErrorRegister(true)
                }
                break;
            case 'password':
                if (value !== ''){
                    setPassword(value);
                    setPasswordMissingErrorRegister(false);
                } else if(!passwordMissingErrorRegister) {
                    setPassword('');
                    setPasswordMissingErrorRegister(true)
                }
                break;
        }
    }

    function handleLoginPostRegister(token)
    {
          const userObject = {
                username: username,
                token: token
            }
            setUserObject(userObject);
            setAuthToken(token);
    }


    async function handleRegistrationClick(event){
            event.preventDefault()
            if(username === '' || password === ''){
                if(username === ''){
                    setUsernameMissingErrorRegister(true);
                }
                if(password === ''){
                    setPasswordMissingErrorRegister(true);
                }
                return
            }

             const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, credentials: [{value:password}]  })
                };

            const result = await fetch(Constants.REGISTER_URL, requestOptions

                )
                .then((response) => response.json())
                //.then((result) => handleToken(result))
                .catch(console.log);
                handleLoginPostRegister(result);

        }



    return (
        <div className='Register' data-testid='register-component'>
            <div className='Register-container'>
                <div className='Register-header'>
                    <img src={pixelgramLogo} className='Register-logo' alt='Register-logo'></img>
                    <img src={logoLine} className='Register-logo-line' alt='pixel-logo-line'></img>
                    <h2>Register</h2>
                </div>
                <form className='Register-form' onChange={handleFormChange}>
                    <input type='input' placeholder='Username...' name='username' className='Register-Input-Field' data-testid='register-username-input'/>
                    {usernameMissingErrorRegister ? <small className='error-message username-error-position' data-testid='register-username-missing'>* Username is required</small> : null}
                    <input type='password' placeholder='Password...' name='password' className='Register-Input-Field' data-testid='register-password-input'/>
                    {passwordMissingErrorRegister ? <small className='error-message password-error-position' data-testid='register-password-missing'>* Password is required</small> : null}
                    {userNameAlreadyExistsError ? <small className='error-message'>* Username already exists</small> : null}
                    <div className='Register-buttons'>
                        <button className='Register-button' onClick = {handleRegistrationClick} data-testid='register-button'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register