import express from 'express';
import httpProxy from 'http-proxy';

import './config/dotenv';

import { corsMiddleware } from './middlewares';

const { PORT, DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const DB_URL = `${DB_HOST}:${DB_PORT}/_db/${DB_NAME}/`;
const FoxxProxy = httpProxy.createProxyServer({
  target: DB_URL,
  auth: `${DB_USER}:${DB_PASSWORD}`,
});

const App = express();

const proxyResult = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  console.log(`redirecting to Foxx ${req.path}`);

  FoxxProxy.web(req, res);
};

App.use(corsMiddleware)
  .all('/auth/*', proxyResult)
  .all('/user/*', proxyResult)
  .all('/posts/*', proxyResult)
  .all('/*', (_req, res): void => {
    res.status(404).json({
      data: null,
      error: {
        message: 'route not found',
      },
    });
  });

App.listen(Number(PORT), () => console.log(`Listening to localhost:${PORT}`));
