import createRouter from '@arangodb/foxx/router';

import posts from './posts';
import { pipe } from '../utils/compose';

const router: Foxx.Router = pipe(createRouter, posts)();

export default router;
