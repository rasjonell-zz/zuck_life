import JSONAPISerializer from 'json-api-serializer';

import UserSerializer from './user';
import PostSerializer from './post';

const Serializer = new JSONAPISerializer();

Serializer.register('users', UserSerializer);
Serializer.register('posts', PostSerializer);

export default Serializer;
