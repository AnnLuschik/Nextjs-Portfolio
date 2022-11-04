class User {
  constructor(model) {
    this.Model = model;
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as password confirmation');
    }

    return this.Model.create(signUpData);
  }

  signIn(signInData, ctx) {
    const isAuth = ctx.authenticate(signInData);

    if (isAuth) {
      console.log('User is authenticated');
    }

    return 'Signing In Output';
  }

  signOut() {
    return 'Signing Out...';
  }
}

module.exports = User;
