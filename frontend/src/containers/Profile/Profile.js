import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Tooltip, Typography } from 'antd';
import {
  LogoutOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';

import Post from 'components/Post';

import { UserContext } from 'contexts/user';
import { PostsContext } from 'contexts/posts';

const Profile = ({ guest, isGuest }) => {
  const history = useHistory();

  const {
    state: { user, posts: userPosts },
    logOut,
    follow,
  } = useContext(UserContext);

  const { posts: federalPosts } = useContext(PostsContext);

  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  const handleFollow = username => () => follow(username);

  const currentUser = isGuest ? guest : user;
  const posts = isGuest ? federalPosts : userPosts;

  const isFollowing = !isGuest
    ? false
    : !!user.relationships.followings.data.find(
        userMeta => userMeta.id === guest.id,
      );

  const followsYou = !isGuest
    ? false
    : !!user.relationships.followers.data.find(
        userMeta => userMeta.id === guest.id,
      );

  return (
    <div className="Profile-root">
      <div className="Profile-Header">
        <div>
          <h1>{currentUser.attributes.username}</h1>
          {followsYou && (
            <Typography.Paragraph mark>Follows You</Typography.Paragraph>
          )}
        </div>
        {isGuest ? (
          <Tooltip title={isFollowing ? 'Unfollow' : 'Follow'}>
            <Button
              shape="circle"
              type="primary"
              onClick={handleFollow(guest.attributes.username)}
              icon={isFollowing ? <UserDeleteOutlined /> : <UserAddOutlined />}
            />
          </Tooltip>
        ) : (
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
