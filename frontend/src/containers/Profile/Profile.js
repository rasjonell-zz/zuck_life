import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import { UserContext } from 'contexts/user';

const Profile = ({ guest, isGuest }) => {
  const history = useHistory();

  const { state, logOut } = useContext(UserContext);

  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  return (
    <div>
      <h1>
        {isGuest ? guest.attributes.username : state.user.attributes.username}
      </h1>
      {!isGuest && (
        <Button type="primary" onClick={handleLogOut}>
          Log Out!
        </Button>
      )}
    </div>
  );
};

export default Profile;
