const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 완료 시 user.id 값만 K/V 구조로 가짐?? redis 랑 비슷한거 같은데
  passport.serializeUser((user, done) => {
    console.log('[Passport/index] serial user // ', user);
    done(null, user.id);
  });

  // 로그인 이후 요청부터 적용 deserialize (id 기반 데이터 가져옴)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } })
      console.log('[Passprot/index] deserial user // ', user);
      done(null, user);    //req.user 에 계속해서 넣어준다는 말인듯?
    } catch(err) {
      console.error(err);
      done(err);
    }
  });

  local();
}
