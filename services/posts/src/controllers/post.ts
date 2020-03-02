import { db } from '@arangodb';

import { IPost, IRequest } from '../interfaces';

const Post: ArangoDB.Collection = db._collection('posts');
const HasPosted: ArangoDB.Collection = db._collection('has_posted');
const IsPostedIn: ArangoDB.Collection = db._collection('is_posted_in');

export function create(req: IRequest): ArangoDB.Document<IPost> {
  const { body, timelineKey } = req.body;

  const createdAt: string = new Date().toISOString();

  const postMeta: ArangoDB.InsertResult = Post.save({ body, createdAt });

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

  return { body, ...postMeta };
}
