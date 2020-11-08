const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isNotLogin, isLogin } = require('./passportSession');
const { User, Post }  = require('../models');
const router = express.Router();

// SSR 로그인 데이터 처리
router.get('/', async (req, res, next) => {
  console.log('header : ', req.headers);
  try {
    if (req.user) {
      const ssrUserInfo = await User.findOne({
        where: { id : req.user.id },
        attributes: {
          exclude: ['password']
        }
      })
      res.status(200).json(ssrUserInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 회원가입 POST /user
router.post('/', isNotLogin, async (req, res, next) => {
  console.log('req body // ', req.body);
  try {
    const exUser = await User.findOne({
      where : {email: req.body.id}
    });
    console.log('회원 여부 확인 : ', exUser);
    if (exUser) {
      return res.status(403).send('해당 아이디 존재');
    }
    const password = await bcrypt.hash(req.body.pw, 13);
    await User.create({
      email : req.body.id,
      displayName: req.body.displayName,
      password,
    });

    return res.status(200).send('User create Success.')
  } catch(err) {
    console.error(err);
    next(err);
  }
});

// 로그인 POST /login
// passport를 사용하는데 좀 복잡합니다...;;ㄷㄷㄷ
router.post('/login', isNotLogin, async (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (msg) {
      return res.status(401).send(msg.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const userInfo = await User.findOne({
        where: { email : req.body.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id']
        }]
      });
      return res.status(200).json(userInfo);
    })
  })(req, res, next);   // 이건 뭐임?
});
// 로그아웃 POST /logout
router.post('/logout', (req, res) => {
  console.log('logout session // ', req.session);
  req.logout();
  req.session.destroy();
  return res.send('logout Success');
})

// 세션 유지 유저 정보 반환 GET /user
router.get('/', async (req, res, next) => {
  console.log('header // ', req.headers);
  try {
    if (req.user) {
      const userInfoSummary = await User.findOne({
        where: {id : req.user.id},
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }]
      });
      return res.status(200).json(userInfoSummary);
    } else {
      return res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DN 변경 POST /displayname
router.post('/displayname', isLogin, async (req, res, next) => {
  try{
    await User.update({
      displayname: req.body.displayName,
    }, {
      where: { id: req.user.id },
    });
    return res.status(200).json({ displayName: req.body.displayName });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;