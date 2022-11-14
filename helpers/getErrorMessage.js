export const getErrorMessage = (error) => {
  return (
    (error.graphQLErrors && error.graphQLErrors[0].message) ||
    'Something went wrong'
  );
};
