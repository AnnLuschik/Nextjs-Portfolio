import withApollo from 'next-with-apollo';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';

export default withApollo(
  ({ initialState }) => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            userPortfolios: {
              merge(existing, incoming) {
                return incoming;
              }
            }
          }
        }
      }
    });

    return new ApolloClient({
      link: createHttpLink({
        uri: 'http://localhost:3000/graphql'
      }),
      cache: cache.restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
