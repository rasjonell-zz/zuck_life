import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import UserProvider from 'contexts/user';
import PostsProvider from 'contexts/posts';
import ModalsProvider from 'contexts/modals';

import App from 'containers/App';
import * as serviceWorker from 'utils/serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <PostsProvider>
        <UserProvider>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </UserProvider>
      </PostsProvider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.register();
