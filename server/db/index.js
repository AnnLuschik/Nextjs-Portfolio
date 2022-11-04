const mongoose = require('mongoose');
const config = require('../config/dev');

require('./models/portfolio');
require('./models/user');

exports.connect = () => {
  mongoose
    .connect(config.DB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
};
