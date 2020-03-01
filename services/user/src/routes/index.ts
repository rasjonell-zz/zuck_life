import createRouter from '@arangodb/foxx/router';

import user from './user';
import { pipe } from '../utils/compose';

const router: Foxx.Router = pipe(createRouter, user)();

export default router;
