const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local'); // X:x 원래 명칭 X 를 x로 재할당
const { User } = require('../models')

module.exports = () => {
  passport.use(new LocalStrategy({  // 하나는 객체, 하나는 함수
    usernameField: 'email',   // 프론트의 data.email data.password 넣음
    passwordField: 'password'
  }, async (email, password, done) => {
    // 여기서 전략 짬
    try {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        return done(null, false, { reason: '아이디 없네?' });  // null 은 뭐임?
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);  // done 되는 순간 콜백이 실행
      }
      return done(null, false, { reason: '비밀번호 틀렸네?' })
    } catch (err) {
      console.error(err);
      return done(err); // 첫번째 파라미터는 err code
    }


  }));
};