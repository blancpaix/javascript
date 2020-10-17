exports.isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인 하시오');
  }
};

exports.isNotLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그아웃 하시오');
  }
};

exports.switchActivation = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
    res.status(200).send('null of User Data');
  }
  if (req.isAuthenticated()) {
    next();
    res.status(200).send('Existing User Data');
  }
}
