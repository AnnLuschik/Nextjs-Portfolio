const BaseModel = require('./BaseModel');

class ForumCategory extends BaseModel {
  getAll() {
    return this.Model.find({});
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug });
  }
}

module.exports = ForumCategory;
