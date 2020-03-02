import { db } from '@arangodb';

const edges: string[] = ['owns_timeline'];
const collections: string[] = ['users', 'sessions', 'timelines'];

collections.forEach((collection: string): void => {
  if (!db._collection(collection)) {
    db._createDocumentCollection(collection);
  } else {
    console.debug(`
      Collection [${collection}] already exists. Leaving it untouched.
    `);
  }
});

edges.forEach((edge: string): void => {
  if (!db._collection(edge)) {
    db._createEdgeCollection(edge);
  } else {
    console.debug(`
      Edge collection [${edge}] already exists. Leaving it untouched.
    `);
  }
});

const User: ArangoDB.Collection = db._collection('users');
const OwnsTimeline: ArangoDB.Collection = db._collection('owns_timeline');

User.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['username'],
});

OwnsTimeline.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['_from', '_to'],
});
