const crypto = require('crypto');

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
  portfolio: (root, { id }) => {
    return data.portfolios.find((portfolio) => portfolio.id === id);
  },
  portfolios: () => data.portfolios
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }) => {
    const id = crypto.randomBytes(10).toString('hex');
    const newPortfolio = {
      ...input,
      id
    };
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },
  updatePortfolio: (root, { id, input }) => {
    const index = data.portfolios.findIndex((p) => p.id === id);
    const updated = {
      ...data.portfolios[index],
      ...input
    };
    data.portfolios[index] = updated;
    return updated;
  },
  deletePortfolio: (root, { id }) => {
    const index = data.portfolios.findIndex((p) => p.id === id);
    data.portfolios.splice(index, 1);
    return id;
  }
};
