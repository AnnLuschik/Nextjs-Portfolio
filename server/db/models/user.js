const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'Email is required',
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  name: {
    type: String,
    minlength: [2, 'Minimum name length is 2 characters!']
  },
  username: {
    type: String,
    required: true,
    minlength: [5, 'Minimum username length is 5 characters!']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6 characters!'],
    maxlength: [32, 'Maximum length is 32 characters!'],
    required: true
  },
  role: {
    enum: ['guest', 'admin'],
    type: String,
    required: true,
    default: 'guest'
  },
  info: String,
  createdAt: { type: Date, default: Date.now() }
});

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (error, isSuccess) {
    if (error) {
      return done(error);
    }

    return done(null, isSuccess);
  });
};

module.exports = mongoose.model('User', userSchema);
