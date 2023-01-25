/* eslint-disable no-console */
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('./models/portfolio');
require('./models/user');
require('./models/forumCategory');
require('./models/topic');
require('./models/post');

require('dotenv').config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  )
});

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => {
      console.log('Connection error');
      console.error(err);
    });
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'portfolioSessions'
  });

  return store;
};
