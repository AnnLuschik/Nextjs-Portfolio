exports.portfolioQueries = {
  portfolio: async (root, { id }, ctx) => {
    const data = await ctx.models.Portfolio.getById(id);
    return data;
  },
  portfolios: async (root, args, ctx) => {
    const data = await ctx.models.Portfolio.getAll();
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

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser.id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut();
  }
};
