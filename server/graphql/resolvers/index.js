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

exports.portfolioResolvers = {
  portfolio: ({ id }) => {
    return data.portfolios.find((portfolio) => portfolio.id === id);
  },
  portfolios: () => data.portfolios
};
