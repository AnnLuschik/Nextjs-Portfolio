import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from 'apollo/client';

export default withApollo(
  ({ initialState = {} }) => {
    const client = getApolloClient(initialState);
    return client;
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
