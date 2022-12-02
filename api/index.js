import http from 'http';
import express from 'express';
import cors from 'cors';

import createApolloServer from 'server/graphql';
import db from 'server/db';
import initMiddlewares from 'server/middlewares';

db.connect();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApoloServer = async () => {
  initMiddlewares(app, db);
  const apolloServer = createApolloServer(httpServer);
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app
  });
};

startApoloServer();

export default httpServer;
