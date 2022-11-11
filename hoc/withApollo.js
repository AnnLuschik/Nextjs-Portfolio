import withApollo from 'next-with-apollo';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: createHttpLink({
        uri: 'http://localhost:3000/graphql'
      }),
      cache: new InMemoryCache().restore(initialState || {})
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
