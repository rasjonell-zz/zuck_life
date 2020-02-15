import JSONAPISerializer from 'json-api-serializer';

import UserSerializer from './user';

const Serializer = new JSONAPISerializer();

Serializer.register('users', UserSerializer);

export default Serializer;
