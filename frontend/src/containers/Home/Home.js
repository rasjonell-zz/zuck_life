import React, { useContext } from 'react';

import Post from 'components/Post';
import { UserContext } from 'contexts/user';

export default () => {
  const {
    state: { user, posts },
  } = useContext(UserContext);

  return (
    <div className="Home-root">
      {user.relationships.posts.data.map(postMeta => (
        <div className="Home-Post-root">
          <Post key={postMeta.id} post={posts[postMeta.id]} />
        </div>
      ))}
    </div>
  );
};
