const authenticateUser = ({ email, password }) => {
  console.log(`Authenticating user: ${email}`);
  return true;
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => {
      return authenticateUser(options);
    }
  };

  return auth;
};
