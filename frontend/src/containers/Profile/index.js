import { Switch, Route, useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext, useCallback } from 'react';

import { Spin } from 'antd';

import { UserContext } from 'contexts/user';

import UserProfile from './Profile';
import './index.css';

const GuestProfile = () => {
  const params = useParams();
  const [guest, setGuest] = useState(null);
  const { state, findUser } = useContext(UserContext);

  const isGuest = params.username !== state.user.attributes.username;

  const findGuest = useCallback(async () => {
    const _guest = await findUser(params.username);

    setGuest(_guest.data);
  }, [params.username, findUser]);

  useEffect(() => {
    if (isGuest) findGuest();
  }, [isGuest, findGuest]);

  if (!isGuest) return <UserProfile isGuest={false} />;

  if (!guest) return <Spin />;

  return <UserProfile isGuest guest={guest} />;
};

const Profile = () => {
  return (
    <Switch>
      <Route
        exact
        path="/profile"
        component={() => <UserProfile isGuest={false} />}
      />
      <Route exact path="/profile/:username" component={GuestProfile} />
    </Switch>
  );
};

export default Profile;
