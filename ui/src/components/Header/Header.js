import pixelgramLogo from '../../pixelgram-logo.png';
import logoRect from '../../logo-rect.png';
import login from '../../login-icon.png';
import logoPost from '../../Post-logo.svg'
import { useEffect, useState } from 'react';
import './Header.css'
import 'font-awesome/css/font-awesome.min.css'
import { useHistory, useLocation } from 'react-router';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


function Header({ page, changePage, authenticatedUser: user, onLogout }){
    const history = useHistory();



    // This was my attempt to render the header based on the path
    // This block of code works, and it gets the pathname, but I couldn't get the header to 
    // revert back to the 'home page header' when the back button is clicked on the login page.
    // In the turneries below I replaced currentPage === 'home'  with currentUrlPath === '/'.
    

    const [currentPage, setCurrentPage] = useState(page);
    const [loginBtnVisible, setLoginBtnVisible] = useState(false);



    useEffect(() => {
      setCurrentPage(page)
      setLoginBtnVisible(false);
    }, [page])

    function handleLoginIconClick(){
      setLoginBtnVisible(!loginBtnVisible)
    }

    function handleLoginButtonClick(event){
      if(event.target.innerText === 'Login'){
        changePage('login');
        history.push('/login');
      } else {
        onLogout();
      }
    }

    function handleLogoClick(event){
      event.preventDefault();
      changePage('home');
      history.push('/');
    }

    function handlePostButtonClick(event){
       event.preventDefault();
       changePage('createPost');
       //const cookie_key = 'userName';
       history.push('/CreatePost');
    }

    return(
    <header className="App">
        <div className="navbar">
          <div className="navbar-container">
            <div className="navbar-contents">
              <div className="navbar-container-logo">
                <a className="navbar-container-logo-link" onClick={handleLogoClick} data-testid='navbar-logo'>
                  <img className="navbar-logo-icon" src={pixelgramLogo} alt="Pixelgram Logo" />
                  <img className="navbar-logo-line" src={logoRect} alt="Logo rect" />
                  <span className="navbar-logo-font">Pixelgram</span>
                </a>
              </div>
              
              <div className="navbar-container-search" style={currentPage !== 'home' ? {visibility:"hidden"} : {}}>
                <div className="navbar-search-container">
                  <input className="navbar-search-contents" placeholder="&#xF002; Search"/>
                </div>
              </div>

              {currentPage === 'home' || currentPage === 'createPost'
              ? <div className='nabar-login-icon-container'>
                  {user != null ?<img class ='navbar-post-icon' src={logoPost} onClick={handlePostButtonClick}></img>:null}
                  <img className="navbar-profile-icon" src={login} alt="Profile Icon" onClick={handleLoginIconClick} data-testid='header-login-icon'/>
                  {loginBtnVisible 
                  ? <div className='login-dropdown-container'>
                      <button className="navbar-login-button" onClick={handleLoginButtonClick} data-testid='header-login-button'>{user == null ? "Login" : "Logout"}</button>
                    </div> 
                  : null}     
              </div> 
              : null}
              
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header