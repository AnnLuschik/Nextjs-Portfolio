import { gql } from 'apollo-boost';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "New Job Title"
        description: "New Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
      }
    ) {
      id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(
      id: $id
      input: {
        title: "Updated Job"
        company: "Updated Company"
        companyWebsite: "Updated Website"
        location: "Updated Location"
        jobTitle: "Updated Job Title"
        description: "Updated Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
      }
    ) {
      id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
