import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Router } from 'react-router';


afterEach(cleanup)

it('shouldDisplayLoginIconOnHomePage', () => {
    render(<Header page='home' />)

    const loginIcon = screen.getByTestId('header-login-icon');
    expect(loginIcon).toBeInTheDocument();
})

it('shouldNotDisplayLoginIconOnLoginPage', () => {
    render(<Header page='login' />)

    const loginIcon = screen.queryByTestId('header-login-icon');
    expect(loginIcon).toBeNull();
})

it('shouldDisplayLoginButtonWhenLoginIconIsClicked', () => {
    render(<Header page='home' />)

    const loginIcon = screen.getByTestId('header-login-icon');
    fireEvent.click(loginIcon);

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
})

it('shouldDisplayLogoutButtonWhenLoginIconIsClicked', () => {
    render(<Header page='home' authenticatedUser={{ username: "fakeUsername", token:"fakeToken" }} />)

    const loginIcon = screen.getByTestId('header-login-icon');
    fireEvent.click(loginIcon);

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
})

it('shouldCallHandlePageChangeFunctionWhenLoginButtonIsPressed', () => {
    const currentPage = 'home';
    const handlePageChange = jest.fn();
    const user = null;
    const handleLogout = jest.fn();

    const history = { push: jest.fn(), location: {}, listen: jest.fn() }

    Enzyme.configure({ adapter: new Adapter() })
    const wrapper = Enzyme.mount(
        <Router history={history}>
                <Header page={currentPage} changePage={handlePageChange} authenticatedUser={user} onLogout={handleLogout}/>
        </Router>
    )
    
    wrapper.find('.navbar-profile-icon').simulate('click');
    wrapper.find('.navbar-login-button').simulate('click', { target: {bubbles: true, innerText: 'Login'}});

    expect(handlePageChange).toHaveBeenCalled();
})

it('shouldCallHandlePageChangeFunctionWhenNavBarLogoIsClicked', () => {
    const currentPage = 'home';
    const handlePageChange = jest.fn();
    const user = null;
    const handleLogout = jest.fn();

    const history = { push: jest.fn(), location: {}, listen: jest.fn() }

    Enzyme.configure({ adapter: new Adapter() })
    const wrapper = Enzyme.mount(
        <Router history={history}>
                <Header page={currentPage} changePage={handlePageChange} authenticatedUser={user} onLogout={handleLogout}/>
        </Router>
    )
    
    wrapper.find("[data-testid='navbar-logo']").simulate('click', { target: {bubbles: true}});

    expect(handlePageChange).toHaveBeenCalled();
})

it('shouldCallHandlePageChangeFunctionWhenLoginButtonIsPressed', () => {
    const currentPage = 'home';
    const handlePageChange = jest.fn();
    const user = {username: "fakeUsername", token: "fakeToken"};
    const handleLogout = jest.fn();

    const history = { push: jest.fn(), location: {}, listen: jest.fn() }

    Enzyme.configure({ adapter: new Adapter() })
    const wrapper = Enzyme.mount(
        <Router history={history}>
                <Header page={currentPage} changePage={handlePageChange} authenticatedUser={user} onLogout={handleLogout}/>
        </Router>
    )

    wrapper.find('.navbar-profile-icon').simulate('click');
    wrapper.find('.navbar-login-button').simulate('click', { target: {bubbles: true, innerText: 'Logout'}});

    expect(handleLogout).toHaveBeenCalled();
})