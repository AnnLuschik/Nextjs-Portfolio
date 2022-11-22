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

exports.userTypes = `
  type User {
    _id: ID
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

exports.forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subtitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    slug: String
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  type Post {
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }

  input PostInput {
    content: String
    topic: String
    parent: String
  }
`;
