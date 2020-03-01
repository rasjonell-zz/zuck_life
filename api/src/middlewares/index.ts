import cors from 'cors';

const whitelist = ['http://localhost:3000', 'https://localhost:3000'];
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: function(origin: string, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
};

export const corsMiddleware = cors(corsOptions);
