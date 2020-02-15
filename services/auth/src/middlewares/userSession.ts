import { db } from '@arangodb';

import { IRequest } from '../interfaces';

const User = db._collection('users');

/**
 *
 * @param req the request object.
 * @param _res the response object.
 * @param next the `next` function.
 */
export default function(
  req: IRequest,
  _res: Foxx.Response,
  next: Foxx.NextFunction,
) {
  if (req.session.uid) {
    try {
      req.user = User.document(req.session.uid);
    } catch (e) {
      req.sessionStorage.clear(req.session);
    }
  }

  next();
}
