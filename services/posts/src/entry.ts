import Router from './routes';

import userSession from './middlewares/userSession';

import { postView } from './controllers/post';

// MIDDLEWARES
module.context.use(userSession);

// ROUTER
module.context.use(Router);

module.exports = {
  views: {
    postView,
  },
};
