import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      title
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      id
      title
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;
