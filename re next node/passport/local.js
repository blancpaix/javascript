const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { reason: 'your Email is not existing!' })
      const result = await bcrypt.compare(password, user.password);
      if (result) return done(null, user);
      // 여기서 유저랑 result 랑 잘 들어감
      return done(null, false, { reason: 'Password is not Correct!' });
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }));
};