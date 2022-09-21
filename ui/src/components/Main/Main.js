import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';
import './Main.css';
import Constants from '../../generic/constant'

function Main ({ changePage, currentUser}) {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  
  const handlePageNumberUpdate = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleCurrentPagePostsUpdate = (curPagePosts) => {
    curPagePosts.forEach(post => {
      post.comments.forEach(comment => {
        comment.index = 0;
      })
    })

    setPosts(posts.concat(curPagePosts));

  }

  useEffect(() => {
    changePage('home');
  }, [])

  useEffect(() => {
    fetch(Constants.POST_URL + `?${new URLSearchParams({
      pageNumber: pageNumber,
      pageSize: pageSize
    })}`)
    .then((response) => response.json())
    .then((result) => handleCurrentPagePostsUpdate(result))
    .catch(console.log);    
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
      if(scrollTop / pageNumber >= 2000) {
        handlePageNumberUpdate();
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop, posts, pageNumber]);
  
  return (
    <>
      <div className="Main" data-testid="Main">
        {posts.map((x) => (<Post data={x} key={x.id} user={currentUser}/>))}
      </div>
    </>
  );
}

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
