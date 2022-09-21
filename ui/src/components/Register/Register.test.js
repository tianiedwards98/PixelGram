import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register'
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import React from "react"
import { act } from "react-dom/test-utils";


afterEach(cleanup);

it('shouldRenderRegisterComponent', () => {
    render(<Register />)

    const register = screen.getByTestId('register-component');
    expect(register).toBeInTheDocument();
})

it('shouldRenderRegisterComponent', () => {
    render(<Register />)

    const usernameInput = screen.getByTestId('register-username-input');
    const passwordInput = screen.getByTestId('register-password-input');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
})

it('shouldNotRenderErrorMessagesOnLoad', () => {
    render(<Register />)

    const usernameMissing = screen.queryByTestId('register-username-missing');
    expect(usernameMissing).toBeNull;

    const passwordMissing = screen.queryByTestId('register-password-missing');
    expect(passwordMissing).toBeNull;


})

it('shouldRenderUsernameMissingErrorMessage', () => {
    render(<Register />)

    const usernameInput = screen.getByTestId('register-username-input');

    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'anything'}});
        fireEvent.change(usernameInput, {target: {value: ''}});
    });
    const usernameMissing = screen.queryByTestId('register-username-missing');
    expect(usernameMissing).toBeInTheDocument();
})

it('shouldRenderPasswordMissingErrorMessage', () => {
    render(<Register />)

    const passwordInput = screen.getByTestId('register-password-input');

    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'anything'}});
        fireEvent.change(passwordInput, {target: {value: ''}});
    });

    const passwordMissing = screen.queryByTestId('register-password-missing');
    expect(passwordMissing).toBeInTheDocument();
})

it('shouldMakeFetchCallWhenRegisterButtonPressed', () => {
    const loginFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/register';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })


    render(<Router history={history}>
        <Register onRegister={loginFn}/>
    </Router>
    )

    const usernameInput = screen.getByTestId('register-username-input');
    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'fakeUsername'}})
    });
    const passwordInput = screen.getByTestId('register-password-input');
    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'fakePassword'}})
    });

    const registerButton = screen.getByTestId('register-button');
    act(() => {
        fireEvent.click(registerButton);
    });

    expect(fetchCall).toHaveBeenCalled();

    global.fetch.mockClear()

})



it('shouldRenderUsernameErrorMessageWhenRegisterButtonClickedAndUsernameIsBlank', () => {
    const registerFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/register';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<Router history={history}>
        <Register onRegister={registerFn}/>
    </Router>
    )
    const passwordInput = screen.getByTestId('register-password-input');
    act(() => {
        fireEvent.change(passwordInput, {target: {value: 'fakePassword'}})
    });

    const loginButton = screen.getByTestId('register-button');
    act(() => {
        fireEvent.click(loginButton);
    });

    const usernameError = screen.getByTestId('register-username-missing');

    expect(usernameError).toBeInTheDocument();

    global.fetch.mockClear()
})

it('shouldRenderUsernameErrorMessageWhenRegisterButtonClickedAndUsernameIsBlank', () => {
    const registerFn = jest.fn();

    const history = createMemoryHistory();
    const route = '/register';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<Router history={history}>
        <Register onRegister={registerFn}/>
    </Router>
    )
    const usernameInput = screen.getByTestId('register-username-input');
    act(() => {
        fireEvent.change(usernameInput, {target: {value: 'fakeUsername'}})
    });

    const registerButton = screen.getByTestId('register-button');
    act(() => {
        fireEvent.click(registerButton);
    });

    const passwordError = screen.getByTestId('register-password-missing');

    expect(passwordError).toBeInTheDocument();

    global.fetch.mockClear()
})
