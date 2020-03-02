export default {
  id: '_key',
  blacklist: ['_key', '_id', '_rev', 'authData'],
  relationships: {
    posts: {
      type: 'posts',
    },
    followings: {
      type: 'users',
    },
    followers: {
      type: 'users',
    },
  },
};
