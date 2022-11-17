/* eslint-disable no-console */
const { portfolios, users, forumCategories } = require('./data');

const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');
const ForumCategory = require('../db/models/forumCategory');

class FakeDb {
  async clean() {
    try {
      await User.deleteMany({});
      await Portfolio.deleteMany({});
      await ForumCategory.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async addData() {
    try {
      await User.create(users);
      await Portfolio.create(portfolios);
      await ForumCategory.create(forumCategories);
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
