class Portfolio {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ['admin'];
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
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  }

  findAndDelete(id) {
    return this.Model.findByIdAndRemove(id);
  }
}

module.exports = Portfolio;
