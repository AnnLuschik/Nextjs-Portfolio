import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as dayjs from 'dayjs';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const isServer = typeof window === 'undefined';
// eslint-disable-next-line
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let apolloClient;

function createApolloClient(initialState = null) {
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
      },
      Portfolio: {
        fields: {
          daysOfExperience: {
            read(_, { readField }) {
              const startDate = readField('startDate');
              const endDate = readField('endDate');
              if (!startDate) return 'Invalid date';

              let now = dayjs().valueOf();
              if (endDate) now = dayjs(+endDate);
              return dayjs(now).diff(dayjs(+startDate), 'day');
            }
          }
        }
      }
    }
  });

  return new ApolloClient({
    ssrMode: isServer,
    link: createHttpLink({
      uri: process.env.BASE_URL,
      credentials: 'same-origin'
    }),
    cache: cache.restore(windowApolloState || initialState),
    ssrForceFetchDelay: 100
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  const _pageProps = { ...pageProps };
  if (pageProps?.props) {
    _pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return _pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
