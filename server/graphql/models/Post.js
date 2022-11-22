const dayjs = require('dayjs');
const uniqueSlug = require('unique-slug');

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

  async create(data) {
    if (!this.user) {
      throw new Error('You must be signed in to create a post!');
    }

    const post = { ...data };
    post.user = this.user;

    const createdAt = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
    const slugPart = uniqueSlug();
    const fullSlugPart = `${createdAt}:${slugPart}`;

    if (post.parent) {
      const parent = await this.Model.findById(post.parent);
      post.slug = `${parent.slug}/${slugPart}`;
      post.fullSlug = `${parent.fullSlug}/${fullSlugPart}`;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(post);
    return this.Model.findById(createdPost.id)
      .populate('topic')
      .populate('user')
      .populate({ path: 'parent', populate: { path: 'user' } });
  }
}

module.exports = Post;