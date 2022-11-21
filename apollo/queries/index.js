import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
      daysOfExperience @client
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

export const GET_FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      _id
      title
      subtitle
      slug
    }
  }
`;

const topicResponse = `
  _id
  title
  content
  slug
  forumCategory {
    _id
    title
    slug
  }
  user {
    username
    avatar
  }
`;

export const GET_TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
     ${topicResponse}
    }
  }
`;

export const GET_TOPIC_BY_SLUG = gql`
  query GetTopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${topicResponse}
    }
  }
`;
