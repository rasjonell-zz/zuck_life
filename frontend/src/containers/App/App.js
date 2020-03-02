import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts/user';

import Home from 'containers/Home';
import Login from 'containers/Login';
import Profile from 'containers/Profile';

import Layout from 'components/Layout';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  if (!state.user && !state.isLoading) return <Redirect to="/login" />;

  return <Route {...rest} component={Component} />;
};

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/join" component={() => <Login isSignUp />} />
      <Layout>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
      </Layout>
    </Switch>
  </div>
);

export default App;
