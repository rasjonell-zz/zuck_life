import { db } from '@arangodb';

import Auth from '../utils/auth';
import { IRequest, IUser } from '../interfaces';

const User = db._collection('users');
const Timeline = db._collection('timelines');
const OwnsTimeline = db._collection('owns_timeline');

/**
 * Validates given credentials and
 * saves it in the session storage.
 *
 * @param username
 * @param password
 * @param req
 *
 * @returns `true` if the user is valid, `false` if not.
 */
export function logIn(
  username: string,
  password: string,
  req: IRequest,
): boolean {
  const user: IUser = User.firstExample({ username });
  const isNotValid: boolean = !Auth.verify(user.authData, password);

  if (isNotValid) return false;

  req.session.uid = user._key;
  req.sessionStorage.save(req.session);

  return true;
}

/**
 * Creates a new user document with secure hash
 * and saves it in the session storage.
 *
 * @param username
 * @param password
 * @param req
 */
export function signUp(
  username: string,
  password: string,
  req: IRequest,
): void {
  const authData = Auth.create(password);

  const user: IUser = {
    username,
    authData,
  };

  const userMeta: ArangoDB.InsertResult = User.save(user);
  const timelineMeta: ArangoDB.InsertResult = Timeline.save({
    createdAt: new Date().toISOString(),
  });

  OwnsTimeline.save({
    _from: userMeta._id,
    _to: timelineMeta._id,
  });

  req.session.uid = userMeta._key;
  req.sessionStorage.save(req.session);
}

/**
 * clears the current session.
 */
export function logOut(req: IRequest): void {
  req.sessionStorage.clear(req.session);
}

/**
 *
 * @returns currently logged in user's username.
 */
export function whoami(req: IRequest): string {
  const user = User.document(req.session.uid);
  return user.username;
}
