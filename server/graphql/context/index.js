const passport = require('passport');

const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(error));
      }

      if (user) {
        return resolve(user);
      }
      return reject(new Error('Invalid passport or email'));
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
  });
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => {
      return authenticateUser(options);
    }
  };

  return auth;
};
