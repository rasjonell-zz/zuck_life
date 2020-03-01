import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import UserProvider from 'contexts/user';

import App from 'containers/App';
import * as serviceWorker from 'utils/serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.register();
