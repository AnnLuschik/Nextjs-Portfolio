import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PORTFOLIOS } from 'apollo/queries';
import {
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_IN
} from 'apollo/mutations';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

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
      const { portfolios: cached } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = cached.filter((p) => p.id !== id);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: {
          portfolios: newPortfolios
        }
      });
    }
  });

// AUTH ACTIONS

export const useSignIn = () => useMutation(SIGN_IN);
