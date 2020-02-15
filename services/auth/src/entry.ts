import { db } from '@arangodb';
import sessionMiddleware from '@arangodb/foxx/sessions';

import Router from './routes';

const sessions = sessionMiddleware({
  transport: 'cookie',
  storage: db._collection('sessions'),
});

// MIDDLEWARES
module.context.use(sessions);

// ROUTER
module.context.use(Router);
