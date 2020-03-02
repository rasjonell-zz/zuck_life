import React, { useReducer, createContext } from 'react';

const defaultState = {
  post: {
    open: false,
    isCreate: true,
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'post':
      return { ...state, post: { ...state.post, ...payload } };
    default:
      throw new Error(`unknown action type: ${type}`);
  }
};

export const ModalsContext = createContext(defaultState);

const ModalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const setModals = ({ type }) => payload => {
    dispatch({ type, payload });
  };

  return (
    <ModalsContext.Provider value={{ state, setModals }}>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContextProvider;
