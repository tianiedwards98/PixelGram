import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';
import Post from './Post';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

describe('Post component', () => {

  afterEach(cleanup);

  it('should mount', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const post = screen.getByTestId('Post');
    expect(post).toBeInTheDocument();
  });

  it('should display gorilla as the username', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const username = screen.getAllByTestId('Post-username');
    expect(username[0]).toHaveTextContent('gorilla');
  });

  it('should contain two instances of the username', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const usernames = screen.getAllByTestId('Post-username').length;
    expect(usernames).toEqual(2);
  });

  it('should display shortened description with 3 elipses if over 140 characters', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const description = screen.getByTestId('Post-description').textContent.length;
    expect(description).toBeLessThanOrEqual(143);
  })

  it('should display the more button if description is over 140 characters', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const moreButton = screen.queryByTestId('post-footer-more');
    expect(moreButton).toBeInTheDocument();
  });

  it('should not display view more comments button when there are no more comments to view', () => {
    render(<Post data-testid="post1"  data={{
      id: 13,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 5,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const viewMoreCommentsButton = screen.queryByTestId('view-more-comments');
    expect(viewMoreCommentsButton).toBeNull();
  })

  it('should not display view more comments button when there are no more comments to view', () => {
    render(<Post data-testid="post1"  data={{
      id: 14,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 7,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)
    const viewMoreCommentsButton = screen.queryByTestId('view-more-comments');
    expect(viewMoreCommentsButton).toBeInTheDocument();
  })

  it('should call fetch when button is clicked', () => {

    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve([
          {id: "6", username: "elephant1", body: "This is comment 6."},
          {id: "7", username: "elephant2", body: "This is comment 7."},
          {id: "8", username: "elephant3", body: "This is comment 8."},
          {id: "9", username: "elephant4", body: "This is comment 9."},
          {id: "10", username: "elephant5", body: "This is comment 10."}
        ])
      })

    render(<Post data-testid="post1"  data={{
      id: 14,
      message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
      createdBy: {
        id: 6,
        username: "gorilla",
        profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
      },
      imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
      likes: 0,
      hasLiked: false,
      createdOn: "2021-02-13",
      commentCount: 10,
      comments: [
        {id: "1", username: "elephant1", body: "This is comment 1."},
        {id: "2", username: "elephant2", body: "This is comment 2."},
        {id: "3", username: "elephant3", body: "This is comment 3."},
        {id: "4", username: "elephant4", body: "This is comment 4."},
        {id: "5", username: "elephant5", body: "This is comment 5."}
      ]
    }} />)

    fireEvent(screen.queryByTestId('view-more-comments'), new MouseEvent('click', {
      bubbles: true,
      cancelable: false
    }))

    expect(fetchCall).toHaveBeenCalled();

    global.fetch.mockClear()
  })

  test('shouldDisplayFiveMoreCommentsWhenFetchIsCalled', () => {
    Enzyme.configure({ adapter: new Adapter() })

    const expectedResult = [
          {id: "6", username: "elephant1", body: "This is comment 6."},
          {id: "7", username: "elephant2", body: "This is comment 7."},
          {id: "8", username: "elephant3", body: "This is comment 8."},
          {id: "9", username: "elephant4", body: "This is comment 9."},
          {id: "10", username: "elephant5", body: "This is comment 10."}
        ]
    
    const fetchCall = global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(expectedResult)
    })
  
    const wrapper = Enzyme.mount(<Post data-testid="post1"  data={{
            id: 14,
            message: "This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture This is a picture ",
            createdBy: {
              id: 6,
              username: "gorilla",
              profileImageUrl: "https://i.guim.co.uk/img/media/391c44b26c05a527a82e9279884f2450ddfb107c/0_59_3184_1911/master/3184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=757fc444bb264704914aee5e5bd6bfa8"
            },
            imageUrl: "https://miro.medium.com/max/1400/1*V7GYJQ_4lykfDzOf9q17eA.jpeg",
            likes: 0,
            hasLiked: false,
            createdOn: "2021-02-13",
            commentCount: 10,
            comments: [
              {id: "1", username: "elephant1", body: "This is comment 1."},
              {id: "2", username: "elephant2", body: "This is comment 2."},
              {id: "3", username: "elephant3", body: "This is comment 3."},
              {id: "4", username: "elephant4", body: "This is comment 4."},
              {id: "5", username: "elephant5", body: "This is comment 5."}
            ]
          }} />);
  
    wrapper.find("[data-testid='view-more-comments']").simulate('click', { target: {bubbles: true}});

    expect(wrapper.find('[data-testid="Comment"]').length).toEqual(10);

    global.fetch.mockClear()
  });

});