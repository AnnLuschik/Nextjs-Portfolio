import { useEffect } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER } from 'apollo/queries';

export const useUser = ({ redirectTo, redirectIfFound } = {}) => {
  const { data, error } = useQuery(GET_USER, {
    fetchPolicy: 'network-only'
  });

  const user = data && data.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
};
