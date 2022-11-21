/* eslint-disable no-console */
const { portfolios, users, forumCategories, topics, posts } = require('./data');

const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');
const ForumCategory = require('../db/models/forumCategory');
const Topic = require('../db/models/topic');
const Post = require('../db/models/post');

class FakeDb {
  async clean() {
    try {
      await User.deleteMany({});
      await Portfolio.deleteMany({});
      await ForumCategory.deleteMany({});
      await Topic.deleteMany({});
      await Post.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async addData() {
    try {
      await User.create(users);
      await Portfolio.create(portfolios);
      await ForumCategory.create(forumCategories);
      await Topic.create(topics);
      await Post.create(posts);
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
