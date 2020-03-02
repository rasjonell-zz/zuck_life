import Router from './routes';

import userSession from './middlewares/userSession';

import { userView } from './controllers/user';

// MIDDLEWARES
module.context.use(userSession);

// ROUTER
module.context.use(Router);

module.exports = {
  views: {
    userView,
  },
};
