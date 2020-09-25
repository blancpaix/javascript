const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 로그인 성공 이후 그 다음 요청부터 적용 deserialize
  passport.deserializeUser(async (id, done) => {
    try {
      // id로부터 사용자 정보를 가져옴
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user 에 넣어줌
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
}