import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS, GET_USER, GET_USER_PORTFOLIOS } from 'apollo/queries';
import {
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_IN,
  SIGN_OUT
} from 'apollo/mutations';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio: res } }) {
      const { portfolios: cached } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: {
          portfolios: [...cached, res]
        }
      });
    }
  });

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio: id } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS
      });
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: {
          userPortfolios: userPortfolios.filter((p) => p.id !== id)
        }
      });
    },
    refetchQueries: [{ query: GET_PORTFOLIOS }]
  });

// AUTH ACTIONS

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      cache.writeQuery({
        query: GET_USER,
        data: {
          user: signIn
        }
      });
    }
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);
