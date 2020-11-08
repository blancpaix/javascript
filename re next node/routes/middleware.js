exports.isSignin = (req, res, next) => {
  // if (req.session.passport.user) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(200).send('Need to Sign In.');
  }
}

exports.isNotSignin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(200).send('Need to LOGOUT.');
  }
}