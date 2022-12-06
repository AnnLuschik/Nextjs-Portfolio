/* eslint-disable global-require */
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const json = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');

exports.init = (server, db) => {
  require('./passport').init(passport);

  const sess = {
    name: 'portfolio-session',
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore()
  };

  if (process.env.NODE_ENV === 'production') {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = true;
    sess.cookie.domain = process.env.DOMAIN;
  }

  server.use(session(sess));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
};
