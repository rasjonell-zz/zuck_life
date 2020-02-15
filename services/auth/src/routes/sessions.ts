import joi from 'joi';

import { IRequest } from '../interfaces';
import * as SessionController from '../controllers/session';

const joiDef = joi
  .object({
    username: joi.string().required(),
    password: joi.string().required(),
  })
  .required();

export default function sessions(Router: Foxx.Router): Foxx.Router {
  Router.post('/login', (req: IRequest, res: Foxx.Response): void => {
    const { username, password } = req.body;
    const success = SessionController.logIn(username, password, req);

    if (!success) res.throw('unauthorized');
    else res.send({ data: { success } });
  })
    .body(joiDef, 'Credentials')
    .description('Logs a registered user in');

  Router.post('/signup', function(req: IRequest, res: Foxx.Response): void {
    try {
      const { username, password } = req.body;
      SessionController.signUp(username, password, req);
      res.send({ data: { success: true } });
    } catch (error) {
      res.throw('bad request', 'Username already taken', error);
    }
  })
    .body(joiDef, 'Credentials')
    .description('Creates a new user and logs them in');

  Router.post('/logout', function(req: IRequest, res: Foxx.Response): void {
    try {
      SessionController.logOut(req);
      res.status('ok');
    } catch (error) {
      console.debug(`No valid session was found: ${req.session}`);
    }
  }).description('Logs the current user out.');

  Router.get('/whoami', function(req: IRequest, res: Foxx.Response) {
    try {
      const username = SessionController.whoami(req);
      res.send({ data: { username } });
    } catch (error) {
      res.throw('unauthorized');
    }
  });

  return Router;
}
