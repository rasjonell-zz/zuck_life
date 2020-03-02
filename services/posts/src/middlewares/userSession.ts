import { db } from '@arangodb';

import { IUser, IRequest, ISession } from '../interfaces';

const User = db._collection('users');
const Session = db._collection('sessions');

/**
 * Sets the currently logged in user
 * to the `req` object.
 * Throws `unauthorized` otherwise.
 *
 * @param req the request object.
 * @param res the response object.
 * @param next the next function.
 */
export default function userSession(
  req: IRequest,
  res: Foxx.Response,
  next: Foxx.NextFunction,
): void {
  const sid: string = req._raw.cookies.sid;

  if (!sid) res.throw('unauthorized');

  const currentSession: ArangoDB.Document<ISession> = Session.firstExample({
    _key: sid,
  });

  if (currentSession) {
    const currentUser: ArangoDB.Document<IUser> = User.firstExample({
      _key: currentSession.uid,
    });

    req.user = currentUser;
  } else {
    res.throw('unauthorized');
  }

  next();
}
