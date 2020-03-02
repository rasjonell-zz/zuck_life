import React, { useContext } from 'react';

import Post from 'components/Post';
import { UserContext } from 'contexts/user';

export default () => {
  const {
    state: { posts },
  } = useContext(UserContext);

  return (
    <div className="Home-root">
      <div className="Home-Header">
        <h1>Feed</h1>
      </div>
      <div className="Home-posts">
        {Object.values(posts)
          .reverse()
          .map(post => (
            <Post post={post} key={post.id} />
          ))}
      </div>
    </div>
  );
};
