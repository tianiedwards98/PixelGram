import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Comment from './Comment'

describe('Comment component', () => {

    afterEach(cleanup);

    it('shouldRenderComment', () => {
        render(<Comment data={{id: 1, username: 'giraffe 1', body: 'this is comment 1'}}/>);

        const comment = screen.getByTestId('Comment');
        expect(comment).toBeInTheDocument();
    })

    it('shouldRenderFiveComments', () => {
        render(<Comment data={{id: 1, username: 'giraffe 1', body: 'this is comment 1'}}/>);
        render(<Comment data={{id: 2, username: 'giraffe 2', body: 'this is comment 2'}}/>);
        render(<Comment data={{id: 3, username: 'giraffe 3', body: 'this is comment 3'}}/>);
        render(<Comment data={{id: 4, username: 'giraffe 4', body: 'this is comment 4'}}/>);
        render(<Comment data={{id: 5, username: 'giraffe 5', body: 'this is comment 5'}}/>);

        const comment = screen.getAllByTestId('Comment').length;
        expect(comment).toEqual(5)
    })
})
