import createRouter from '@arangodb/foxx/router';

import user from './user';

const Router = createRouter();

user(Router);

export default Router;
