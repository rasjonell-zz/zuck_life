import { Spin } from 'antd';
import React, { useContext } from 'react';

import { UserContext } from 'contexts/user';

import Modals from 'components/Modals';
import NavMenu from 'components/NavMenu';

const Layout = ({ children }) => {
  const { state } = useContext(UserContext);

  if (!state.user && !state.isLoading) return children;

  return (
    <>
      {Modals.map(({ Component, key }) => (
        <Component key={key} />
      ))}
      <div className="Layout-root">
        <div className="Layout-NavMenu">
          <NavMenu />
        </div>
        <main className="Layout-Main">
          {state.isLoading ? <Spin size="large" /> : children}
        </main>
      </div>
    </>
  );
};

export default Layout;
