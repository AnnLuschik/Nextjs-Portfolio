class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByTopic(topic) {
    return this.Model.find({ topic })
      .sort('createdAt')
      .populate('user')
      .populate('topic')
      .populate({ path: 'parent', populate: { path: 'user' } });
  }
}

module.exports = Post;
