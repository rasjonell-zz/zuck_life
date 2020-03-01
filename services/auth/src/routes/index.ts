import createRouter from '@arangodb/foxx/router';

import sessions from './sessions';
import { pipe } from '../utils/compose';

const router: Foxx.Router = pipe(createRouter, sessions)();

export default router;
