// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'

// const Posts = () => {
//   const {posts} = useSelector(store=>store.post)
//   return (
//     <div>
//         {
//             posts.map((post) => <Post key={post?._id} post={post}/>)

//         }
//     </div>
//   )
// }

// export default Posts

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import { useSelector } from 'react-redux';
// import { Heading4, Loader2 } from 'lucide-react';
import Stories from './Stories';

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  const [visiblePosts, setVisiblePosts] = useState(5); // Number of posts to show initially
  const [hasMore, setHasMore] = useState(true);

  // Function to load more posts
  const fetchMorePosts = () => {
    if (visiblePosts >= posts.length) {
      setHasMore(false); // Stop loading when all posts are loaded
      return;
    }
    
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 10); // Load 10 more posts
    }, 2000); // Simulate loading time
  };

  return (
    <InfiniteScroll
      dataLength={visiblePosts} // Number of posts currently visible
      next={fetchMorePosts} // Function to fetch more posts
      hasMore={hasMore} // Whether there are more posts to load
      loader={<h4 className='text-center text-white'>Loading...</h4>} // Display while loading
      endMessage={<p className='text-white'>No more posts to show</p>} // Message when no more posts
    >
      <Stories/>
      <div className='bg-black'>
        {posts.slice(0, visiblePosts).map((post) => (
          <Post key={post?._id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Posts;
