exports.mixedQueries = {
  highlight: async (root, { limit = 3 }, ctx) => {
    const portfolios = await ctx.models.Portfolio.getRandoms(limit);
    const topics = await ctx.models.Topic.getRandoms(limit);
    return { portfolios, topics };
  }
};

exports.portfolioQueries = {
  portfolio: async (root, { id }, ctx) => {
    const data = await ctx.models.Portfolio.getById(id);
    return data;
  },
  portfolios: async (root, args, ctx) => {
    const data = await ctx.models.Portfolio.getAll();
    return data;
  },
  userPortfolios: async (root, args, ctx) => {
    const data = await ctx.models.Portfolio.getAllByUser();
    return data;
  }
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    const created = await ctx.models.Portfolio.create(input);
    return created;
  },
  updatePortfolio: async (root, { id, input }, ctx) => {
    const updated = await ctx.models.Portfolio.findAndUpdate(id, input);
    return updated;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deleted = await ctx.models.Portfolio.findAndDelete(id);
    return deleted.id;
  }
};

exports.userQueries = {
  user: async (root, args, ctx) => {
    const data = await ctx.models.User.getAuthUser(ctx);
    return data;
  }
};

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser.id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  }
};

exports.forumQueries = {
  forumCategories: async (root, args, ctx) => {
    const categories = await ctx.models.ForumCategory.getAll();
    return categories;
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) {
      return null;
    }

    const topics = await ctx.models.Topic.getAllByCategory(forumCategory.id);
    return topics;
  },
  topicBySlug: async (root, { slug }, ctx) => {
    const topic = await ctx.models.Topic.getBySlug(slug);
    return topic;
  },
  postsByTopic: async (root, { slug, ...pagination }, ctx) => {
    const topic = await ctx.models.Topic.getBySlug(slug);
    if (!topic) return null;
    const posts = await ctx.models.Post.getAllByTopic({ topic, ...pagination });
    return posts;
  }
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(
      input.forumCategory
    );
    const topic = await ctx.models.Topic.create({
      ...input,
      forumCategory: category.id
    });
    return topic;
  },
  createPost: async (root, { input }, ctx) => {
    const post = await ctx.models.Post.create(input);
    return post;
  }
};
