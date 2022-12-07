const { ApolloServer } = require('@apollo/server');
const gql = require('graphql-tag');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('@apollo/server-plugin-landing-page-graphql-playground');
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer');

const {
  mixedQueries,
  portfolioQueries,
  portfolioMutations,
  userQueries,
  userMutations,
  forumQueries,
  forumMutations
} = require('./resolvers');
const { portfolioTypes, userTypes, forumTypes } = require('./types');

exports.createApolloServer = (httpServer) => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]

      user: User

      forumCategories: [ForumCategory]
      topicsByCategory(category: String): [Topic]
      topicBySlug(slug: String): Topic
      postsByTopic(slug: String, pageNum: Int, pageSize: Int): PaginatedPosts

      highlight(limit: Int): HighlightRes
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      createTopic(input: TopicInput): Topic
      createPost(input: PostInput): Post

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;

  const resolvers = {
    Query: {
      ...mixedQueries,
      ...portfolioQueries,
      ...userQueries,
      ...forumQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations
    }
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
    cache: 'bounded',
    cors: {
      origin: [
        'http://localhost:3000/',
        'https://annluschik-portfolio-app.herokuapp.com/',
        'https://studio.apollographql.com'
      ],
      credentials: true
    },
    csrfPrevention: true
  });

  return apolloServer;
};
