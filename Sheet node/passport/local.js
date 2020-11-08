const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { reason: "Email doesn't existing." });
      const result = await bcrypt.compare(password, user.password);
      if (result) return done(null, user);

      return done(null, false, { reason: 'Password can be incorrect.' })
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }));
}