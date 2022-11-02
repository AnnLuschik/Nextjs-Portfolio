const mongoose = require('mongoose');
const config = require('../config/dev');

require('./models/portfolio');

exports.connect = () => {
  mongoose
    .connect(config.DB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
};
