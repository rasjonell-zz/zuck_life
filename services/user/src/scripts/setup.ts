import { db } from '@arangodb';

const edges: string[] = ['follows'];

edges.forEach((edge: string): void => {
  if (!db._collection(edge)) {
    db._createEdgeCollection(edge);
  } else {
    console.debug(`
      Edge collection [${edge}] already exists. Leaving it untouched.
    `);
  }
});

const Follows = db._collection('follows');

Follows.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['_from', '_to'],
});
