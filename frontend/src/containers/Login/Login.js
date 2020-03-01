import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts/user';

const Login = () => {
  const history = useHistory();

  const { state, logIn } = useContext(UserContext);

  const handleLogIn = async () => {
    await logIn({ username: 'rasjonell', password: 'Qwerty12#' });
    history.push('/');
  };

  if (state.user) return <Redirect to="/" />;

  return <button onClick={handleLogIn}>Come on in!</button>;
};

export default Login;
