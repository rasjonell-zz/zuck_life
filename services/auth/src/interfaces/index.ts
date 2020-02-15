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
}

export interface IRequest extends Foxx.Request {
  user: IUser;
  sessionStorage: ISessionStorage;
}
