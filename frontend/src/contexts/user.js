import { useCookies } from 'react-cookie';
import normalize from 'json-api-normalizer';
import React, {
  useEffect,
  useContext,
  useReducer,
  useCallback,
  createContext,
} from 'react';

import ZuckAxios from 'config/axios';
import { PostsContext } from 'contexts/posts';

const defaultState = {
  users: {},
  posts: {},
  user: null,
  isLoading: true,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setState':
      return { ...payload, isLoading: false };
    case 'loading':
      return { ...state, isLoading: payload };
    case 'logout':
      return { ...defaultState, isLoading: false };
    case 'updateUsers':
      return { ...state, users: { ...state.users, ...payload.users } };
    case 'updatePosts':
      return { ...state, posts: { ...state.posts, ...payload.posts } };
    default:
      throw new Error(`unknown action type: ${type}`);
  }
};

export const UserContext = createContext(defaultState);

const UserContextProvider = ({ children }) => {
  const { fetchPosts } = useContext(PostsContext);

  const [state, dispatch] = useReducer(reducer, defaultState);
  const [cookie, , removeCookie] = useCookies(['sid']);

  const updateState = async () => {
    dispatch({ type: 'loading', payload: true });

    try {
      const { data } = await ZuckAxios.get('/user/');
      fetchPosts();

      dispatch({
        type: 'setState',
        payload: {
          user: data.data,
          ...normalize(data),
        },
      });
    } catch (error) {
      // do smth
    }

    dispatch({ type: 'loading', payload: false });
  };

  useEffect(() => {
    if (cookie.sid) updateState();
  }, [cookie.sid]);

  const logIn = async ({ username, password }) => {
    await ZuckAxios.post('/auth/login', {
      username,
      password,
    });

    updateState();
  };

  const logOut = async () => {
    ZuckAxios.post('/auth/logout');
    removeCookie('sid');
    dispatch({ type: 'logout' });
  };

  const signUp = async ({ username, password }) => {
    await ZuckAxios.post('/auth/signup', {
      username,
      password,
    });

    updateState();
  };

  const findUser = useCallback(
    async username => {
      const { data } = await ZuckAxios.get(`/user/${username}`);
      const normalized = normalize(data);

      dispatch({ type: 'updateUsers', payload: normalized });

      return data;
    },
    [dispatch],
  );

  const createPost = async body => {
    await ZuckAxios.post('/posts/', {
      body,
      timelineKey: state.user.attributes.timeline,
    });

    updateState();
  };

  const editPost = async (postKey, body) => {
    await ZuckAxios.put(`/posts/${postKey}`, {
      body,
    });

    updateState();
  };

  const votePost = async (postKey, direction) => {
    await ZuckAxios.put(`/posts/${postKey}/vote`, {
      direction,
    });

    updateState();
  };

  const follow = async username => {
    await ZuckAxios.post('/user/follow/', {
      username,
    });

    updateState();
  };

  return (
    <UserContext.Provider
      value={{
        state,
        logIn,
        logOut,
        signUp,
        follow,
        findUser,
        editPost,
        votePost,
        createPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
