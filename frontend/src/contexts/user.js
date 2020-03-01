import { useCookies } from 'react-cookie';
import normalize from 'json-api-normalizer';
import React, { useReducer, createContext } from 'react';

import ZuckAxios from 'config/axios';
import { useEffect } from 'react';

const defaultState = {
  users: {},
  user: null,
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setState':
      return { ...action.payload, isLoading: false };
    case 'loading':
      return { ...state, isLoading: action.payload };
    case 'logout':
      return defaultState;
    case 'setUser':
      return { ...action.payload, isLoading: false };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

export const UserContext = createContext(defaultState);

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [cookie, , removeCookie] = useCookies(['sid']);

  const fetchUser = async () => {
    dispatch({ type: 'loading', payload: true });

    try {
      const { data } = await ZuckAxios.get('/user/');

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
    if (cookie.sid) fetchUser();
  }, [cookie]);

  const logIn = async ({ username, password }) => {
    const loginResult = await ZuckAxios.post('/auth/login', {
      username,
      password,
    });

    console.log(loginResult);

    fetchUser();
  };

  const logOut = async () => {
    ZuckAxios.post('/auth/logout');
    removeCookie('sid');
    dispatch({ type: 'logout' });
  };

  // const whoami = async () => {
  //   const result = await ZuckAxios.get('/auth/whoami');
  //   console.log(result.data);
  // };

  return (
    <UserContext.Provider value={{ state, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
