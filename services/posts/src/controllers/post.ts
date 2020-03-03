import { db, time } from '@arangodb';

import {
  IPost,
  IUser,
  IRequest,
  ITimeline,
  IHasVoted,
  IHasPosted,
  IIsPostedIn,
} from '../interfaces';

const User: ArangoDB.Collection = db._collection('users');
const Post: ArangoDB.Collection = db._collection('posts');
const Timeline: ArangoDB.Collection = db._collection('timelines');
const HasVoted: ArangoDB.Collection = db._collection('has_voted');
const HasPosted: ArangoDB.Collection = db._collection('has_posted');
const IsPostedIn: ArangoDB.Collection = db._collection('is_posted_in');

export function postView(
  post: ArangoDB.Document<IPost>,
  user: ArangoDB.Document<IUser>,
): ArangoDB.Document<IPost> {
  const isOwn: boolean = !!HasPosted.firstExample({
    _from: user._id,
    _to: post._id,
  });

  const postedBy: string = isOwn
    ? user.username
    : User.document(HasPosted.firstExample({ _to: post._id })._from).username;

  const ownVote: ArangoDB.Document<IHasVoted> = HasVoted.firstExample({
    _from: user._id,
    _to: post._id,
  });

  const votes: ArangoDB.Edge<IHasVoted>[] = HasVoted.inEdges(post);
  const rating: number = votes.reduce(
    (prev: number, current: ArangoDB.Edge<IHasVoted>): number =>
      prev + current.direction,
    0,
  );

  return { ...post, isOwn, ownVote, rating, postedBy };
}

/**
 * Looks at each timeline and returns its posts
 *
 * @param req The request object
 * @returns all the posts in each timeline
 */
export function list(req: IRequest): ArangoDB.Document<IPost>[] {
  const timelines: ArangoDB.Document<ITimeline>[] = Timeline.all().toArray();

  return timelines.flatMap(
    (timeline: ArangoDB.Document<ITimeline>): ArangoDB.Document<IPost>[] =>
      IsPostedIn.inEdges(timeline).map(
        (edge: ArangoDB.Edge<IIsPostedIn>): ArangoDB.Document<IPost> =>
          postView(Post.document(edge._from), req.user),
      ),
  );
}

/**
 * Creates a new post object and
 * posts it in the given timeline.
 *
 * @param req The request object
 * @returns `newPost` — The newly created post.
 */
export function create(req: IRequest): ArangoDB.Document<IPost> {
  const { body, timelineKey } = req.body;

  const createdAt: string = new Date().toISOString();

  const postMeta: ArangoDB.InsertResult = Post.save({
    body,
    createdAt,
    updatedAt: createdAt,
  });

  HasPosted.save({
    createdAt,
    _to: postMeta._id,
    _from: req.user._id,
  });

  IsPostedIn.save({
    createdAt,
    _from: postMeta._id,
    _to: `timelines/${timelineKey}`,
  });

  return postView({ body, ...postMeta }, req.user);
}

/**
 * Edits a post with given key and body.
 *
 * @param req The request object
 * @returns `updatedPost` — The edited post.
 */
export function edit(req: IRequest): ArangoDB.Document<IPost> {
  const { body } = req.body;
  const { postKey } = req.pathParams;

  const editedPost: ArangoDB.UpdateResult = Post.update(postKey, {
    body,
    updatedAt: new Date().toISOString(),
  });

  return postView({ ...editedPost, body }, req.user);
}

/**
 * Updates/Inserts a new `has_voted`
 * relationship to the given post
 *
 * @param req The request object.
 * @returns The newly updated post.
 */
export function vote(req: IRequest): ArangoDB.Document<IPost> {
  const { direction } = req.body;
  const { postKey } = req.pathParams;

  const post: ArangoDB.Document<IPost> = Post.document(postKey);

  const vote: ArangoDB.Document<IHasVoted> = HasVoted.firstExample({
    _from: req.user._id,
    _to: post._id,
  });

  const createdAt: string = new Date().toISOString();
  const updatedAt: string = createdAt;

  if (vote)
    HasVoted.update(vote, {
      updatedAt,
      direction: vote.direction === direction ? 0 : direction,
    });
  else
    HasVoted.save({
      direction,
      createdAt,
      _to: post._id,
      _from: req.user._id,
    });

  return postView(post, req.user);
}
