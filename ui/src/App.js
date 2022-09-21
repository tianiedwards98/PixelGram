import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main/Main'
import { useState } from 'react';
import Register from './components/Register/Register';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import CreateComment from './components/CreateComment/CreateComment';

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);

  function handlePageChange(destinationPage) {
    setCurrentPage(destinationPage)
  }

  function handleLogin(userObject){
    setUser(userObject);
    bake_cookie('UserObject', userObject);
    setCurrentPage('home')
  }

  function handleLogout(){
    setUser(null);
  }

  function handleRegister(userObject){
    setUser(userObject);
    setCurrentPage('home')

   }

  return (
    <Router>
      <Header page={currentPage} changePage={handlePageChange} authenticatedUser={user} onLogout={handleLogout}/>
      <Switch>
        <Route exact path='/'>
          <Main changePage={handlePageChange} currentUser={user} data-testid="mainPage"/>
        </Route>
        <Route path='/login'>
          <Auth onLogin={handleLogin}  changePage={handlePageChange} data-testid="Auth"/>
        </Route>
        <Route path='/register'>
          <Register onRegister={handleRegister} changePage={handlePageChange} data-testid="Register"/>
        </Route>
        <GuardedRoute path='/CreatePost' component={CreatePost} auth={user !== null ? true : false}  changePage={handlePageChange} data-testid="CreatePost" authenticatedUser={user}/>
          {/* <Route path='/CreatePost'>
                <CreatePost  changePage={handlePageChange} data-testid="CreatePost"/>
           </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
