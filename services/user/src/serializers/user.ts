export default {
  id: '_key',
  blacklist: ['_key', '_id', '_rev', 'authData'],
  relationships: {
    followings: {
      type: 'users',
    },
    followers: {
      type: 'users',
    },
  },
};
