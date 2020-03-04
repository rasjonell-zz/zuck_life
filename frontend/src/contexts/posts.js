import normalize from 'json-api-normalizer';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchPosts = useCallback(async () => {
    dispatch({ type: 'setLoading', payload: true });

    try {
      const { data } = await ZuckAxios.get('/posts/');

      dispatch({ type: 'updateAll', payload: normalize(data) });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({ type: 'setLoading', payload: false });
        history.push('/login');
      }
    }
  }, [history, dispatch]);

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
