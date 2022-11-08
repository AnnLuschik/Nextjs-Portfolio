/* eslint-disable no-console */
const { portfolios, users } = require('./data');

const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');

class FakeDb {
  async clean() {
    try {
      await User.deleteMany({});
      await Portfolio.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async addData() {
    try {
      await User.create(users);
      await Portfolio.create(portfolios);
    } catch (error) {
      console.log(error);
    }
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();
