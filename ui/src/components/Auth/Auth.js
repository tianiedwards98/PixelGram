import { useEffect, useState } from 'react';
import pixelgramLogo from '../../pixelgram-logo.png'
import logoLine from '../../logo-rect-2.png'
import './Auth.css'
import { useHistory } from 'react-router';
import Constants from '../../generic/constant';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

function Auth({ onLogin, changePage}) {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(null);
    const [userObject, setUserObject] = useState(null);

    const [usernameMissingError, setUsernameMissingError] = useState(false);
    const [passwordMissingError, setPasswordMissingError] = useState(false);
    const [invalidUsernameOrPasswordError, setInvalidUsernameOrPasswordError] = useState(false);

    useEffect(() => {
        if(authToken == null){
            return;
        } else if(authToken.access_token){
            onLogin(userObject);
            bake_cookie('authToken', authToken.access_token);
            bake_cookie('userName', username);
            history.push('/');
        } else{
            if(password !== '' && username !== ''){
                setInvalidUsernameOrPasswordError(true)
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
                    setUsernameMissingError(false);
                } else if(!usernameMissingError) {
                    setUsername('');
                    setUsernameMissingError(true)
                }
                break;
            case 'password':
                if (value !== ''){
                    setPassword(value);
                    setPasswordMissingError(false);
                } else if(!passwordMissingError) {
                    setPassword('');
                    setPasswordMissingError(true)
                }
                break;
        }
    }

    function handleToken(token){
        const userObject = {
            username: username,
            token: token
        }
        setUserObject(userObject);
        setAuthToken(token);
    }

    function handleRegisterClick(event){
        event.preventDefault();
        changePage('login');
        history.push('/register');
    }

    async function handleLoginClick(event){
        event.preventDefault()
        if(username === '' || password === ''){
            if(username === ''){
                setUsernameMissingError(true);
            }
            if(password === ''){
                setPasswordMissingError(true);
            }
            return
        }

        const encodedUsername = encodeURI(username);
        const encodedPassword = encodeURI(password);

        const result = await fetch(Constants.AUTH_URL, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
            body: "username=" + encodedUsername + "&password=" + encodedPassword + "&client_id=" + 
            Constants.CLIENT_ID + "&grant_type=" + Constants.GRANT_TYPE 
            })
            .then((response) => response.json())
            // .then((result) => handleToken(result))
            .catch(console.log);

            handleToken(result)
    }

    


    return (
        <div className='Auth' data-testid='auth-component'>
            <div className='Auth-container'>
                <div className='Auth-header'>
                    <img src={pixelgramLogo} className='Auth-logo' alt='Auth-logo'></img>
                    <img src={logoLine} className='Auth-logo-line' alt='pixel-logo-line'></img>
                    <h2>Login</h2>
                </div>
                <form className='Auth-form' onChange={handleFormChange}>
                    <input type='input' placeholder='Username...' name='username' className='Auth-Input-Field' data-testid='auth-username-input'/>
                    {usernameMissingError ? <small className='error-message username-error-position' data-testid='auth-username-missing'>* Username is required</small> : null}
                    <input type='password' placeholder='Password...' name='password' className='Auth-Input-Field' data-testid='auth-password-input'/>
                    {passwordMissingError ? <small className='error-message password-error-position' data-testid='auth-password-missing'>* Password is required</small> : null}
                    {invalidUsernameOrPasswordError ? <small className='error-message' data-testid='auth-credentials-invalid'>* Username or Password is incorrect</small> : null}
                    <div className='Auth-buttons'>
                        <a className='Auth-Register-button' onClick={handleRegisterClick}>Register</a>
                        
                        <button className='Auth-Login-button' onClick={handleLoginClick} data-testid='auth-button-login'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth