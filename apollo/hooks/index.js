import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  GET_PORTFOLIOS,
  GET_PORTFOLIO,
  GET_USER,
  GET_USER_PORTFOLIOS,
  GET_FORUM_CATEGORIES,
  GET_TOPICS_BY_CATEGORY,
  GET_TOPIC_BY_SLUG,
  GET_POSTS_BY_TOPIC,
  GET_HIGHLIGHTED
} from 'apollo/queries';
import {
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CREATE_TOPIC,
  SIGN_IN,
  SIGN_OUT,
  CREATE_POST
} from 'apollo/mutations';

export const useGetPortfolio = (options) => useQuery(GET_PORTFOLIO, options);

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    refetchQueries: [{ query: GET_PORTFOLIOS }],
    errorPolicy: 'all'
  });

export const useUpdatePortfolio = () =>
  useMutation(UPDATE_PORTFOLIO, {
    errorPolicy: 'all'
  });

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
    }
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
    },
    errorPolicy: 'all'
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);

export const useGetUser = () => useQuery(GET_USER);

// FORUM ACTIONS

export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORIES);

export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic: response } }) {
      try {
        const cached = cache.readQuery({
          query: GET_TOPICS_BY_CATEGORY,
          variables: { category: response.forumCategory.slug }
        });
        const topics = cached ? cached.topicsByCategory : [];
        cache.writeQuery({
          query: GET_TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topics, response] },
          variables: { category: response.forumCategory.slug }
        });
      } catch (e) {
        return null;
      }
    }
  });

export const useGetTopicBySlug = (options) =>
  useQuery(GET_TOPIC_BY_SLUG, options);

export const useGetPostsByTopic = (options) =>
  useQuery(GET_POSTS_BY_TOPIC, options);

export const useCreatePost = () =>
  useMutation(CREATE_POST, {
    onCompleted() {
      toast.success('Post has been created', { autoClose: 2000 });
    },
    refetchQueries: ['GetPostsByTopic']
  });
