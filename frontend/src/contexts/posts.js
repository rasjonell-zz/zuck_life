import normalize from 'json-api-normalizer';
import React, {
  useEffect,
  useReducer,
  useCallback,
  createContext,
} from 'react';

import ZuckAxios from 'config/axios';

const defaultState = {
  posts: {},
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setLoading':
      return { ...state, isLoading: payload };
    case 'updateAll':
      return { isLoading: false, ...payload };
    default:
      throw new Error(`unknown action type: ${type}`);
  }
};

export const PostsContext = createContext(defaultState);

const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchPosts = useCallback(async () => {
    dispatch({ type: 'setLoading', payload: true });

    const { data } = await ZuckAxios.get('/posts/');

    dispatch({ type: 'updateAll', payload: normalize(data) });
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{ ...state, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
