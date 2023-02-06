const BaseModel = require('./BaseModel');

class Portfolio extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = ['admin'];
  }

  async getRandoms(limit) {
    const query = await super.getRandoms(limit);
    return query();
  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findById(id);
  }

  getAllByUser() {
    return this.Model.find({ user: this.user.id }).sort({ startDate: 'desc' });
  }

  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error('Not Authorized!');
    }
    return this.Model.create({ ...data, user: this.user });
  }

  findAndUpdate(id, data) {
    return this.Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  findAndDelete(id) {
    return this.Model.findByIdAndRemove(id);
  }
}

module.exports = Portfolio;
