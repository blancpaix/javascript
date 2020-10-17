const passport = require('passport')
, bcrypt = require('bcrypt')
, { Strategy } = require('passport-local');
const { User } = require('../models');

module.exports = () => {
  passport.use(new Strategy({ // 하나는 객체 하나는 함수임
    // data.id? data.password 값 넣음
    usernameField: 'id',
    passwordField: 'pw',
    session: false,
  },
  async (id, pw, done) => {
    // request object is now first argument   여기서 전략을 실행하세요!
    try {
      const user = await User.findOne({ email: id });
      if (!user) {
        return done(null, false, { reason: '사용자가 없소!' });
      }
      const result = await bcrypt.compare(pw, user.password);
      if (result) {
        return done(null, user);
      }
      
      return done(null, false, { reason: '아이디나 비밀번호가 다르오!' });
    } catch(err) {
      console.error(err);
      return done(err);
    }
  }));
};

// 이게 어떻게 돌아가는건지를 알려줘야지..  