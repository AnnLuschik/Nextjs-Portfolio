const Portfolio = require('../../db/models/portfolio');

const data = {
  portfolios: [
    {
      id: 'sad87da79',
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programming....',
      startDate: '01/01/2014',
      endDate: '01/01/2016'
    },
    {
      id: 'da789ad1',
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsible for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013'
    },
    {
      id: 'sadcxv9',
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011'
    }
  ]
};

exports.portfolioQueries = {
  portfolio: async (root, { id }) => {
    const data = await Portfolio.findById(id);
    return data;
  },
  portfolios: async () => {
    const data = await Portfolio.find({});
    return data;
  }
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }) => {
    const created = await Portfolio.create(input);
    return created;
  },
  updatePortfolio: async (root, { id, input }) => {
    const updated = await Portfolio.findByIdAndUpdate(id, input, {
      new: true
    });
    return updated;
  },
  deletePortfolio: async (root, { id }) => {
    const deleted = await Portfolio.findByIdAndRemove(id);
    return deleted.id;
  }
};
