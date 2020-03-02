import joi from 'joi';

import Serializer from '../serializers';
import { IRequest, IUser } from '../interfaces';
import * as PostController from '../controllers/post';

export default function user(Router: Foxx.Router): Foxx.Router {
  Router.post('/', (req: IRequest, res: Foxx.Response): void => {
    const newPost = PostController.create(req);

    res.send(Serializer.serialize('posts', newPost));
  }).body(
    joi
      .object({
        body: joi.string().required(),
        timelineKey: joi.string().required(),
      })
      .required(),
    'Post Body',
  );

  Router.put('/:postKey', (req: IRequest, res: Foxx.Response): void => {
    const newPost = PostController.edit(req);

    res.send(Serializer.serialize('posts', newPost));
  })
    .pathParam(
      'postKey',
      joi.string().required(),
      'key of the post to be edited',
    )
    .body(
      joi
        .object({
          body: joi.string().required(),
        })
        .required(),
      'Post body',
    );

  Router.put('/:postKey/vote', (req: IRequest, res: Foxx.Response): void => {
    const newPost = PostController.vote(req);

    res.send(Serializer.serialize('posts', newPost));
  })
    .pathParam(
      'postKey',
      joi.string().required(),
      'Key of the post to be voted',
    )
    .body(
      joi
        .object({
          direction: joi
            .number()
            .integer()
            .min(-1)
            .max(1)
            .required(),
        })
        .required(),
      'Body of the vote object',
    );

  return Router;
}
