/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');

const express = require('express');
const http = require('http');
const next = require('next');
require('dotenv').config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  )
});
const { createApolloServer } = require('./graphql');

const db = require('./db');

// Connect to database
db.connect();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);

  require('./middlewares').init(server, db);

  const apolloServer = createApolloServer(httpServer);

  const origin = [
    'http://localhost:3000/',
    'https://annluschik-portfolio-app.herokuapp.com/',
    'https://studio.apollographql.com'
  ];

  await apolloServer.start();

  server.use(
    '/graphql',
    cors({
      origin,
      credentials: true
    }),
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  // apolloServer.applyMiddleware({
  //   app: server,
  //   cors: {
  //     origin,
  //     credentials: true
  //   },
  //   path: '/graphql'
  // });

  server.all('*', (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    return handle(req, res);
  });

  // server.listen(port, (err) => {
  //   if (err) throw err;
  //   console.log(`🚀 Ready on http://localhost:${port}`);
  // });

  await new Promise(function executor(resolve) {
    httpServer.listen({ port }, resolve);
  });
});
