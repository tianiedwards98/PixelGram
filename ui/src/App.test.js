import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

afterEach(cleanup);

test('renders Main component', () => {
  render(<App />);
  const linkElement = screen.getByText("Pixelgram");
  expect(linkElement).toBeInTheDocument();
});

test('shouldHandlePageChanges', () => {
  Enzyme.configure({ adapter: new Adapter() })

  const wrapper = Enzyme.mount(<App />);

  wrapper.find('.navbar-profile-icon').simulate('click');
  wrapper.find('.navbar-login-button').simulate('click', { target: {bubbles: true, innerText: 'Login'}});


  expect(wrapper.find('[data-testid="Auth"]').length).toEqual(1);
});

// test('shouldHandleLogin', () => {
//   Enzyme.configure({ adapter: new Adapter() })

//   const expectedResult = [
//     {authToken: "fakeToken", refreshToken: "anotherFakeToken"}
//   ]

//   const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: () => Promise.resolve(expectedResult)
//     })

//   const wrapper = Enzyme.mount(<App />);

//   wrapper.find('.navbar-profile-icon').simulate('click');
//   wrapper.find('.navbar-login-button').simulate('click', { target: {bubbles: true, innerText: 'Login'}});
//   wrapper.find("[data-testid='auth-username-input']").simulate('change', { target: {bubbles: true, name: 'username', value: 'fakeUsername'}});
//   wrapper.find("[data-testid='auth-password-input']").simulate('change', { target: {bubbles: true, name: 'password', value: 'fakePassword'}});
//   wrapper.find("[data-testid='auth-button-login']").simulate('click', { target: {bubbles: true}});

//   expect(wrapper.find("[data-testid='mainPage']").length).toEqual(1);
// });


