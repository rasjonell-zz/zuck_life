import { db, query } from '@arangodb';

import {
  IUser,
  IPost,
  IFollows,
  IRequest,
  ITimeline,
  IIsPostedIn,
  IOwnsTimeline,
} from '../interfaces';

const { views } = module.context.dependencies.posts;

const Follows: ArangoDB.Collection = db._collection('follows');
const User: ArangoDB.Collection<IUser> = db._collection('users');
const Post: ArangoDB.Collection<IPost> = db._collection('posts');
const IsPostedIn: ArangoDB.Collection = db._collection('is_posted_in');
const OwnsTimeline: ArangoDB.Collection = db._collection('owns_timeline');
const Timeline: ArangoDB.Collection<ITimeline> = db._collection('timelines');

export function userView(
  user: ArangoDB.Document<IUser>,
): ArangoDB.Document<IUser> {
  const followerEdges: ArangoDB.Edge<IFollows>[] = Follows.inEdges(user);
  const followingEdges: ArangoDB.Edge<IFollows>[] = Follows.outEdges(user);
  const timelineEdges: ArangoDB.Edge<IOwnsTimeline>[] = OwnsTimeline.outEdges(
    user,
  );

  const followers: ArangoDB.Document<IUser>[] = followerEdges.map(
    (edge: ArangoDB.Edge<IFollows>): ArangoDB.Document<IUser> =>
      User.document(edge._from),
  );

  const followings: ArangoDB.Document<IUser>[] = followingEdges.map(
    (edge: ArangoDB.Edge<IFollows>): ArangoDB.Document<IUser> =>
      User.document(edge._to),
  );

  const timeline: ArangoDB.Document<ITimeline> = Timeline.document(
    timelineEdges[0]._to,
  );

  const postsEdges: ArangoDB.Edge<IIsPostedIn>[] = IsPostedIn.inEdges(timeline);

  const posts: ArangoDB.Document<IPost>[] = postsEdges.map(
    (edge: ArangoDB.Edge<IIsPostedIn>): ArangoDB.Document<IPost> =>
      views.postView(Post.document(edge._from), user),
  );

  const suggestions = query`
    LET user = DOCUMENT(${user._id})

    FOR v, e, p IN 2..2 OUTBOUND user follows
      FILTER v.username != user.username

      COLLECT id = v._id INTO names

      let numberOfOccurrences = LENGTH(names)

      SORT numberOfOccurrences DESC

      let suggestedUser = DOCUMENT(id)

      RETURN suggestedUser.username
  `.toArray();

  return {
    ...user,
    posts,
    followers,
    followings,
    suggestions,
    timeline: timeline._key,
  };
}

/**
 * @param req the request object.
 * @returns `user` object with relationships
 */
export function currentUser(req: IRequest): ArangoDB.Document<IUser> {
  const user: ArangoDB.Document<IUser> = req.user;

  return userView(user);
}

export function findUser(username: string): ArangoDB.Document<IUser> {
  const user: ArangoDB.Document<IUser> = User.firstExample({
    username,
  });

  return userView(user);
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
