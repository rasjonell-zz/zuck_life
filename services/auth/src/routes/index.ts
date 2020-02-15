import createRouter from '@arangodb/foxx/router';

import sessions from './sessions';

const Router = createRouter();

sessions(Router);

export default Router;
