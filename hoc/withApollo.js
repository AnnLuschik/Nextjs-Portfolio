import withApollo from 'next-with-apollo';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';
import * as dayjs from 'dayjs';

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
      cache: cache.restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience({ startDate, endDate }) {
            let now = dayjs().valueOf();
            if (endDate) now = dayjs(+endDate);
            return dayjs(now).diff(dayjs(+startDate), 'day');
          }
        }
      }
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
