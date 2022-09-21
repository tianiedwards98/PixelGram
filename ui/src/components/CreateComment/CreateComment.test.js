import CreateComment from "./CreateComment";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('shouldRenderBodyInput', () => {
    render(<CreateComment />);

    const input = screen.getByTestId('create-comment-body');
    expect(input).toBeInTheDocument();
})

it('shouldRenderSubmitButton', () => {
    render(<CreateComment />);

    const button = screen.getByTestId('create-comment-button');
    expect(button).toBeInTheDocument();
})

it('shouldRenderSubmitButton', () => {
    render(<CreateComment />);

    const input = screen.getByTestId('create-comment-body');
    act(() => {
        fireEvent.change(input, {target: {value: 'anything'}});
    });

    expect(input.value).toBe('anything');
})

it('shouldRenderSubmitButton', () => {
    const handleCreateComment = jest.fn();
    const id = 1;
    const user = {username: "giraffe", token: {access_token: "fakeToken"}}

    // const history = createMemoryHistory();
    // const route = '/register';
    // history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<CreateComment postId={id} currentUser={user} addComment={handleCreateComment}/>)

    const input = screen.getByTestId('create-comment-body');
    act(() => {
        fireEvent.change(input, {target: {value: 'anything'}});
    });

    const button = screen.getByTestId('create-comment-button');
    act(() => {
        fireEvent.click(button);
    });

    expect(fetchCall).toHaveBeenCalled();

    global.fetch.mockClear()


})

