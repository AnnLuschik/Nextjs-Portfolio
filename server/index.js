const express = require('express');
const next = require('next');

const { createApolloServer } = require('./graphql');

// Connect to database
require('./db').connect();

const port = parseInt(process.env.port, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  const apolloServer = createApolloServer();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
