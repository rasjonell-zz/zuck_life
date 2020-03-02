import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Post from 'components/Post';

import { UserContext } from 'contexts/user';

const Profile = ({ guest, isGuest }) => {
  const history = useHistory();

  const {
    state: { user, posts },
    logOut,
  } = useContext(UserContext);

  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  const currentUser = isGuest ? guest : user;

  return (
    <div className="Profile-root">
      <div className="Profile-Header">
        <h1>{currentUser.attributes.username}</h1>
        {!isGuest && (
          <Tooltip title="Logout">
            <Button
              shape="circle"
              type="primary"
              onClick={handleLogOut}
              icon={<LogoutOutlined />}
            />
          </Tooltip>
        )}
      </div>
      <div className="Profile-posts">
        {currentUser.relationships.posts.data.reverse().map(postMeta => (
          <Post post={posts[postMeta.id]} key={postMeta.id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
