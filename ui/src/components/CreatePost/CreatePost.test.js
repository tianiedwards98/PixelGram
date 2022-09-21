import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePost from './CreatePost';
import Post from '../Post/Post'
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import React from "react"
import { act } from "react-dom/test-utils";


afterEach(cleanup);

it('shouldRenderCreatePostComponent', () => {

    render(<CreatePost />)

    const createPost = screen.getByTestId('createPost-component');
    expect(createPost).toBeInTheDocument();
})

it('shouldRenderCreatePostComponent', () => {
    render(<CreatePost />)
    const uploadInput = screen.getByTestId('createPost-uploadfile-button');
    const descBoxInput = screen.getByTestId('createPost-DescBox');
    expect(uploadInput).toBeInTheDocument();
    expect(descBoxInput).toBeInTheDocument();
})

it('shouldMakeFetchCallWhenUploadButtonPressed', () => {

    const handlePageChange = jest.fn();
    const user = {};

    const history = createMemoryHistory();
    const route = '/CreatePost';
    history.push(route);

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
      })

    render(<Router history={history}>
        <CreatePost changePage={handlePageChange} authenticatedUser={user}/>
    </Router>
    )

    const uploadPostButton = screen.getByTestId('Upload-Post-Button');
    act(() => {
        fireEvent.click(uploadPostButton)
    });
    
    expect(fetchCall).toHaveBeenCalled();

    global.fetch.mockClear()

})

it('shouldChangeValueInTextAreaWhenChangeEventTriggered', () => {
    render(<CreatePost />)

    const postDescriptionInput = screen.getByTestId('createPost-DescBox');

    act(() => {
        fireEvent.change(postDescriptionInput, {target: {value: 'anything'}});
    });

    expect(postDescriptionInput.value).toBe("anything");
})
