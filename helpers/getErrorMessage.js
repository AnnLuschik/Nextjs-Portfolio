export const getErrorMessage = (error) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message;
  }
  return 'Something went wrong';
};
