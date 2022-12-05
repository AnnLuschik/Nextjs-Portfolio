const dev = require('./dev');
const prod = require('./prod');

const isProd = process.env.NODE_ENV === 'production';

module.exports = isProd ? prod : dev;
