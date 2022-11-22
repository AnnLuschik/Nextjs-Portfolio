class ForumCategory {
  constructor(model, user) {
    this.Model = model;
  }

  getAll() {
    return this.Model.find({});
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug });
  }
}

module.exports = ForumCategory;
