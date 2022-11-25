import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as dayjs from 'dayjs';

const isServer = typeof window === 'undefined';
// eslint-disable-next-line
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT;

export function getApolloClient(initialState) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          userPortfolios: {
            merge(existing, incoming) {
              return incoming;
            }
          },
          postsByTopic: {
            keyArgs: ['slug'],
            read(existing, { args: { pageNum, pageSize } }) {
              const offset = (pageNum - 1) * pageSize;

              return (
                existing && {
                  ...existing,
                  content: existing.content.slice(offset, offset + pageSize)
                }
              );
            },
            merge(existing, incoming, { args: { pageNum = 0, pageSize = 5 } }) {
              const merged = existing ? existing.content.slice(0) : [];
              const offset = (pageNum - 1) * pageSize;
              for (let i = 0; i < incoming.content.length; i++) {
                merged[offset + i] = incoming.content[i];
              }
              return { ...incoming, content: merged };
            }
          }
        }
      }
    }
  });

  CLIENT = new ApolloClient({
    ssrMode: isServer,
    link: createHttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin'
    }),
    cache: cache.restore(windowApolloState || initialState),
    ssrForceFetchDelay: 100,
    resolvers: {
      Portfolio: {
        daysOfExperience({ startDate, endDate }) {
          let now = dayjs().valueOf();
          if (endDate) now = dayjs(+endDate);
          return dayjs(now).diff(dayjs(+startDate), 'day');
        }
      }
    }

    /**
        // Default options to disable SSR for all queries.
        defaultOptions: {
          // Skip queries when server side rendering
          // https://www.apollographql.com/docs/react/data/queries/#ssr
          watchQuery: {
            ssr: false
          },
          query: {
            ssr: false
          }
          // Selectively enable specific queries like so:
          // `useQuery(QUERY, { ssr: true });`
        }
      */
  });
  // }

  return CLIENT;
}
