export default {
  id: '_key',
  blacklist: ['_key', '_id', '_rev', 'authData', '_oldRev'],
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
