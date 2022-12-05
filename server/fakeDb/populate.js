/* eslint-disable no-console */
const mongoose = require('mongoose');
const fakeDb = require('./FakeDb');

const db = require('../db');

const populate = async () => {
  try {
    db.connect();
    console.log('Starting populating DB...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated');
  } catch (error) {
    console.error('Error with data import', error);
  }
};

populate();
