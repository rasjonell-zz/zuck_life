import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import formatDistance from 'date-fns/formatDistance';

import { Card, Menu, Dropdown } from 'antd';
import {
  EditOutlined,
  MoreOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import { UserContext } from 'contexts/user';
import { ModalsContext } from 'contexts/modals';

const Post = ({ post }) => {
  const { votePost } = useContext(UserContext);
  const { setModals } = useContext(ModalsContext);

  const handleVote = direction => () => votePost(post.id, direction);

  const handleClick = e => {
    if (e.key === 'Post-Menu-Edit')
      setModals({ type: 'post' })({
        open: true,
        isCreate: false,
        postToEdit: post,
      });
  };

  const date = formatDistance(
    new Date(post.attributes.updatedAt),
    new Date(Date.now()),
    {
      addSuffix: true,
      includeSeconds: true,
    },
  );

  const title = (
    <div className="Post-title">
      <Link to={`/profile/${post.attributes.postedBy}`}>
        {post.attributes.postedBy}
      </Link>
      <p className="Post-title-date">
        {post.attributes.updatedAt === post.attributes.createdAt
          ? 'posted'
          : 'edited'}{' '}
        {date}
      </p>
    </div>
  );

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="Post-Menu-Edit">
        <EditOutlined />
        <span>Edit Post</span>
      </Menu.Item>
    </Menu>
  );

  const extra = post.attributes.isOwn && (
    <Dropdown overlay={menu} trigger={['click']}>
      <MoreOutlined style={{ fontSize: 24 }} rotate={90} />
    </Dropdown>
  );

  const actions = [
    <ArrowUpOutlined
      onClick={handleVote(1)}
      key={`${post.id}-upvote`}
      style={
        post.attributes.ownVote && post.attributes.ownVote.direction === 1
          ? {
              color: '#2980b9',
            }
          : undefined
      }
    />,
    <div className="Post-rating" key={`${post.id}-rating`}>
      {post.attributes.rating}
    </div>,
    <ArrowDownOutlined
      onClick={handleVote(-1)}
      key={`${post.id}-downvote`}
      style={
        post.attributes.ownVote && post.attributes.ownVote.direction === -1
          ? {
              color: 'red',
            }
          : undefined
      }
    />,
  ];

  return (
    <Card
      title={title}
      extra={extra}
      actions={actions}
      className="Post-Card-root"
    >
      <p>{post.attributes.body}</p>
    </Card>
  );
};

export default Post;
