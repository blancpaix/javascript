// Custom middleware
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 인자 있으면 에러처리, 없으면 다음
  } else {
    res.status(401).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그아웃 필요');
  }
};