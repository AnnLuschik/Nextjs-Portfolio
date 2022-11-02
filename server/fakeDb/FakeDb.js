const { portfolios } = require('./data');

const Portfolio = require('../db/models/portfolio');

class FakeDb {
  async clean() {
    try {
      await Portfolio.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async addData() {
    try {
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
