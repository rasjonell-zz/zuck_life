import { db } from '@arangodb';

const collections: string[] = ['posts'];
const edges: string[] = ['has_posted', 'is_posted_in', 'has_voted'];

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

const HasVoted: ArangoDB.Collection = db._collection('has_voted');
const HasPosted: ArangoDB.Collection = db._collection('has_posted');
const IsPostedIn: ArangoDB.Collection = db._collection('is_posted_in');

HasVoted.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['_from', '_to'],
});

HasPosted.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['_from', '_to'],
});

IsPostedIn.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['_from', '_to'],
});
