class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByTopic(topic) {
    return this.Model.find({ topic: topic.id })
      .populate('user')
      .populate('topic')
      .populate({ path: 'parent', populate: 'user' });
  }
}

module.exports = Post;
