import { db } from '@arangodb';

import { IRequest, IUser, IFollows } from '../interfaces';

const User = db._collection('users');
const Follows = db._collection('follows');

/**
 * @param req the request object.
 * @returns `user` object with relationships
 */
export function currentUser(req: IRequest): ArangoDB.Document<IUser> {
  const user: ArangoDB.Document<IUser> = req.user;

  const followerEdges: ArangoDB.Edge<IFollows>[] = Follows.inEdges(user);
  const followingEdges: ArangoDB.Edge<IFollows>[] = Follows.outEdges(user);

  const followers: ArangoDB.Document<IUser>[] = followerEdges.map(
    (edge: ArangoDB.Edge<IFollows>): ArangoDB.Document<IUser> =>
      User.document(edge._from),
  );

  const followings: ArangoDB.Document<IUser>[] = followingEdges.map(
    (edge: ArangoDB.Edge<IFollows>): ArangoDB.Document<IUser> =>
      User.document(edge._to),
  );

  return { ...user, followings, followers };
}

/**
 * Adds a (USER)-[:FOLLOWS]->(USER) relationship
 *
 * @param username the username to follow.
 * @param req the request object.
 *
 */
export function follow(
  username: string,
  req: IRequest,
): ArangoDB.Document<IUser> {
  const user: ArangoDB.Document<IUser> = req.user;
  const userToFollow: ArangoDB.Document<IUser> = User.firstExample({
    username,
  });

  if (!userToFollow) throw 'not found';

  const prevEdge: ArangoDB.Document<IFollows> = Follows.firstExample({
    _from: user._id,
    _to: userToFollow._id,
  });

  if (prevEdge) {
    Follows.remove(prevEdge);

    return currentUser(req);
  }

  const currentDate = new Date().toISOString();

  Follows.save({
    _from: user._id,
    _to: userToFollow._id,
    createdAt: currentDate,
  });

  return currentUser(req);
}
