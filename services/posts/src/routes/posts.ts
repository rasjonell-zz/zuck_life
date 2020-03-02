import joi from 'joi';

import Serializer from '../serializers';
import { IRequest, IUser } from '../interfaces';
import * as PostController from '../controllers/post';

export default function user(Router: Foxx.Router): Foxx.Router {
  Router.post('/', (req: IRequest, res: Foxx.Response): void => {
    const newPost = PostController.create(req);

    return Serializer.serialize('posts', newPost);
  }).body(
    joi
      .object({
        body: joi.string().required(),
        timelineKey: joi.string().required(),
      })
      .required(),
    'Post Body',
  );

  return Router;
}
