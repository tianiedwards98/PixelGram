import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from "react-dom/test-utils";
import Main from './Main';


describe('<Main />', () => {

  beforeEach(() => {
    act(() => {
      const handlePageChange = jest.fn();
      render(<Main changePage={handlePageChange} />);
    });
  });

  it('should mount', () => {
    const main = screen.getByTestId('Main');
    expect(main).toBeInTheDocument();
  });

  it('should display posts', async() => {
    const posts = await screen.findAllByTestId('Post', undefined, {timeout: 5000});
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should display an initial 5 post if total post count is > 5', async() => {
    const posts = await screen.findAllByTestId('Post', undefined, {timeout: 5000});
    expect(posts.length).toBeLessThanOrEqual(5);
  });
});