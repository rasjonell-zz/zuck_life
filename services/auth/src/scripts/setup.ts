import { db } from '@arangodb';

const collections: string[] = ['users', 'sessions'];

collections.forEach((collection: string): void => {
  if (!db._collection(collection)) {
    db._createDocumentCollection(collection);
  } else {
    console.debug(`
      Collection [${collection}] already exists. Leaving it untouched.
    `);
  }
});

const User = db._collection('users');

User.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['username'],
});
