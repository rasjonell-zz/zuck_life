import express from 'express';
import httpProxy from 'http-proxy';

import './config/dotenv';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const DB_URL = `${DB_HOST}:${DB_PORT}/_db/${DB_NAME}/`;
const FoxxProxy = httpProxy.createProxyServer({
  target: DB_URL,
  auth: `${DB_USER}:${DB_PASSWORD}`,
});

const App = express();

App.all('/*', (req, res): void => {
  console.log(`redirecting to Foxx ${req.path}`);

  FoxxProxy.web(req, res);
});

App.listen(3000, () => console.log('Listening to localhost:3000'));
