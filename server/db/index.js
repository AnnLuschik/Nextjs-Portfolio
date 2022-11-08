/* eslint-disable no-console */
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const config = require('../config/dev');

require('./models/portfolio');
require('./models/user');

exports.connect = () => {
  mongoose
    .connect(config.DB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: 'portfolioSessions'
  });

  return store;
};
