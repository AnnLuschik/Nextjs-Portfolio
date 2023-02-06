import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
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
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
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

// AUTH MUTATIONS START ----------------------------

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

// AUTH MUTATIONS END ----------------------------

// FORUM MUTATIONS START ----------------------------

export const CREATE_TOPIC = gql`
  mutation CreateTopic($input: TopicInput) {
    createTopic(input: $input) {
      _id
      title
      content
      slug
      createdAt
      forumCategory {
        _id
        title
        slug
      }
      user {
        username
        avatar
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      _id
      content
      slug
      createdAt
      topic {
        title
        slug
      }
      user {
        username
        avatar
      }
      parent {
        _id
        content
        slug
        user {
          username
          avatar
        }
      }
    }
  }
`;

// FORUM MUTATIONS END ----------------------------
