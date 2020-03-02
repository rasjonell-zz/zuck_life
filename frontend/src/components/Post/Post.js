import React from 'react';
import { Card } from 'antd';

const Post = ({ post }) => (
  <Card title={post.attributes.createdAt} className="Post-Card-root">
    <p>{post.attributes.body}</p>
  </Card>
);

export default Post;
