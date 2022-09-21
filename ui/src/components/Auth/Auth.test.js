import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Auth from './Auth'
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import React from "react"
import { act } from "react-dom/test-utils";


afterEach(cleanup);

it('shouldRenderAuthComponent', () => {
    render(<Auth />)

    const auth = screen.getByTestId('auth-component');
    expect(auth).toBeInTheDocument();
})

it('shouldRenderAuthComponent', () => {
    render(<Auth />)

    const usernameInput = screen.getByTestId('auth-username-input');
    const passwordInput = screen.getByTestId('auth-username-input');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
})

it('shouldNotRenderErrorMessagesOnLoad', () => {
    render(<Auth />)

    const usernameMissing = screen.queryByTestId('auth-username-missing');
    expect(usernameMissing).toBeNull;

    const passwordMissing = screen.queryByTestId('auth-password-missing');
    expect(passwordMissing).toBeNull;

    const invalidCredentials = screen.queryByTestId('auth-credentials-invalid');
    expect(invalidCredentials).toBeNull;
})

it('shouldRenderUsernameMissingErrorMessage', () => {
    render(<Auth />)

    const usernameInput = screen.getByTestId('auth-username-input');

    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'anything'}});
        fireEvent.change(usernameInput, {target: {value: ''}});
    });
    const usernameMissing = screen.queryByTestId('auth-username-missing');
    expect(usernameMissing).toBeInTheDocument();
})

it('shouldRenderUsernameMissingErrorMessage', () => {
    render(<Auth />)

    const passwordInput = screen.getByTestId('auth-password-input');

    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'anything'}});
        fireEvent.change(passwordInput, {target: {value: ''}});
    });

    const passwordMissing = screen.queryByTestId('auth-password-missing');
    expect(passwordMissing).toBeInTheDocument();
})

it('shouldMakeFetchCallWhenLoginButtonPressed', () => {
    const loginFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/login';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    
    render(<Router history={history}>
        <Auth onLogin={loginFn}/>
    </Router>
    )

    const usernameInput = screen.getByTestId('auth-username-input');
    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'fakeUsername'}})
    });
    const passwordInput = screen.getByTestId('auth-password-input');
    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'fakePassword'}})
    });

    const loginButton = screen.getByTestId('auth-button-login');
    act(() => {
        fireEvent.click(loginButton);
    });

    expect(fetchCall).toHaveBeenCalled();

    global.fetch.mockClear()

})

it('shouldRenderUsernameErrorMessageWhenLoginButtonClickedAndUsernameIsBlank', () => {
    const loginFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/login';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<Router history={history}>
        <Auth onLogin={loginFn}/>
    </Router>
    )
    const passwordInput = screen.getByTestId('auth-password-input');
    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'fakePassword'}})
    });

    const loginButton = screen.getByTestId('auth-button-login');
    act(() => {
        fireEvent.click(loginButton);
    });

    const usernameError = screen.getByTestId('auth-username-missing');

    expect(usernameError).toBeInTheDocument();

    global.fetch.mockClear()
})

it('shouldRenderUsernameErrorMessageWhenLoginButtonClickedAndUsernameIsBlank', () => {
    const loginFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/login';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<Router history={history}>
        <Auth onLogin={loginFn}/>
    </Router>
    )
    const usernameInput = screen.getByTestId('auth-username-input');
    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'fakeUsername'}})
    });

    const loginButton = screen.getByTestId('auth-button-login');
    act(() => {
        fireEvent.click(loginButton);
    });

    const passwordError = screen.getByTestId('auth-password-missing');

    expect(passwordError).toBeInTheDocument();

    global.fetch.mockClear()
})
