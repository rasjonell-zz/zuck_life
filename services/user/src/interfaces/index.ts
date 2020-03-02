interface Raw {
  cookies: {
    sid?: string;
  };
}

interface ISessionStorage extends Foxx.SessionStorage {
  prune: () => void;
  save: (session?: Foxx.Session) => void;
  clear: (session: Foxx.Session) => void;
}

export interface IUser {
  _id?: string;
  _key?: string;
  authData?: any;
  username?: string;
  followers?: ArangoDB.Document<IUser>[];
  followings?: ArangoDB.Document<IUser>[];
}

export interface ISession {
  data?: any;
  uid?: string;
  created?: string;
  expires?: string;
}

export interface IPost {
  body?: string;
}

export interface ITimeline {
  createdAt?: string;
}

export interface IFollows {
  createdAt?: string;
}

export interface IOwnsTimeline {
  createdAt?: string;
}

export interface IIsPostedIn {
  createdAt?: string;
}

export interface IHasPosted {
  createdAt?: string;
  updatedAt?: string;
}

export interface IHasVoted {
  direction?: -1 | 0 | 1;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRequest extends Foxx.Request {
  _raw: Raw;
  user: ArangoDB.Document<IUser>;
  sessionStorage: ISessionStorage;
}
