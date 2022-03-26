const passport = require('passport');
const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id },
      (err, user) => {
        return done(err, user);
      })
  }));
}