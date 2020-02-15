import Router from './routes';

import userSession from './middlewares/userSession';

// MIDDLEWARES
module.context.use(userSession);

// ROUTER
module.context.use(Router);
