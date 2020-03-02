import React, { useContext } from 'react';

import { Spin } from 'antd';

import Post from 'components/Post';
import { PostsContext } from 'contexts/posts';

export default () => {
  const { posts, isLoading } = useContext(PostsContext);

  return (
    <div className="Home-root">
      <div className="Home-Header">
        <h1>Feed</h1>
      </div>
      <div className="Home-posts">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          Object.values(posts)
            .reverse()
            .map(post => <Post post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
};
