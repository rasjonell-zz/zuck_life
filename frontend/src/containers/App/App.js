import React, { useContext } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import { UserContext } from 'contexts/user';

import Login from 'containers/Login';
import Profile from 'containers/Profile';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  if (!state.user) return <Redirect to="/login" />;

  return <Route {...rest} component={Component} />;
};

const App = () => {
  const { state } = useContext(UserContext);

  if (state.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute
          exact
          path="/"
          component={() => <Link to="/profile">Your Profile</Link>}
        />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default App;
