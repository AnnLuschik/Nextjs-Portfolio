const GraphqlStrategy = require('./strategies');
const User = require('../../db/models/user');

exports.init = (passport) => {
  passport.use(
    'graphql',
    new GraphqlStrategy(({ email, password }, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }

        user.validatePassword(password, (error, isMatching) => {
          if (error) return done(error);

          if (!isMatching) return done(null, false);

          return done(null, user);
        });
      });
    })
  );
};
