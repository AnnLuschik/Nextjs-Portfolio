const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');

const {
  portfolioQueries,
  portfolioMutations,
  userQueries,
  userMutations
} = require('./resolvers');
const { portfolioTypes, userTypes } = require('./types');
const { buildAuthContext } = require('./context');

const Portfolio = require('./models/Portfolio');
const User = require('./models/User');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]

      user: User
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
        User: new User(mongoose.model('User'))
      }
    })
  });

  return apolloServer;
};
