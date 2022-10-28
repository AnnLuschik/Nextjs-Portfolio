const portfolioFields = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: String,
  endDate: String
`;

exports.portfolioTypes = `
  type Portfolio {
    id: ID!
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;
