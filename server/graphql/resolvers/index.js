const Portfolio = require('../../db/models/portfolio');

exports.portfolioQueries = {
  portfolio: async (root, { id }, ctx) => {
    const data = ctx.models.Portfolio.getById(id);
    return data;
  },
  portfolios: async (root, args, ctx) => {
    const data = await ctx.models.Portfolio.getAll();
    return data;
  }
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    const created = ctx.models.Portfolio.create(input);
    return created;
  },
  updatePortfolio: async (root, { id, input }, ctx) => {
    const updated = ctx.models.Portfolio.findAndUpdate(id, input);
    return updated;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deleted = await ctx.models.Portfolio.findAndDelete(id);
    return deleted.id;
  }
};
