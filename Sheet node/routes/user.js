const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const nodemailer = require('nodemailer');

const { User } = require('../models');

const router = express.Router();
const { isNotSignin, isSignin } = require('./authMiddleware');

// SSR - [index] 세션 데이터 리턴, 유저 정보 다시 정제
router.get('/currentsession', async (req, res, next) => {
  // 세션은 서버에서 관리, 쿠키는 클라이언트로 두개는 연동
  // 두 값이 존재하기때문에 아무런 입력 값 없이 로딩 가능
  // console.log('headers', req.headers, '\n req.user', req.user);
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password', 'createdAt',]
        }
      });
      res.status(200).json(userInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/checkEmail/:email', isNotSignin, async (req, res, next) => {
  try {
    const exUser = await User.findOne({ where: { email: req.params.email } });
    if (exUser) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/findaccount', isNotSignin, async (req, res, next) => {
  console.log('req.body', req.body, '\n req.params', req.params);
  // req.body 에 다 들어가있음
  try {
    const { email, name } = req.body;
    // 이메일이랑 아이디 맞는지 확인은 앞에서 하고 틀리면 리턴을 해줘
    const exUser = await User.findOne({ where: { email, name } });
    if (exUser) {
      const collection = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      let tempPassword = '';
      for (let i = 0; i < 7; i++) {
        const collectionPick = Math.floor(Math.random() * collection.length);
        tempPassword += collection[collectionPick];
      };
      const hashedPassword = await bcrypt.hash(tempPassword, 13);

      const isUpdate = await User.update({ password: hashedPassword }, { where: { email } });
      // isUpdate true return 1 else 0

      if (isUpdate) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
          }
        })

        const sender = await transporter.sendMail({
          from: 'Knote_admin@noreply.io',
          to: email,
          subject: 'Knote의 사용자 비밀번호가 변경되었습니다.',
          text: `비밀번호 변경!`,
          html: `<p>비밀번호가 변경되었습니다.\n변경된 비밀번호는 <b>${tempPassword}</b> 입니다. 수정하세요</p>`
        });

        console.log('Message sent: \n', sender.messageId)
        return res.status(200).json('post email success;')
      } else {
        return res.status(503).json('mailer error occured.');
      }
    } else {
      res.status(403).json('다시 확인 부탁드림');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/signup', isNotSignin, async (req, res, next) => {
  console.log('req.body \n', req.body);
  try {
    const { email, password, displayName, name } = req.body;
    const exUser = await User.findOne({ where: { email } });
    const hashedPassword = await bcrypt.hash(password, 13);
    if (exUser) return res.status(403).send('이미 사용중');
    await User.create({
      email, password: hashedPassword, displayName, name,
    })
    const result = User.findOne({
      where: { email },
      attributes: {
        exclude: ['password']
      }
    });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/signin', isNotSignin, (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (msg) return res.status(401).send(msg.reason);
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr); return next(loginErr);
      }
      const userData = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password', 'createdAt']
        }
      });

      return res.status(200).json(userData);
    })
  })(req, res, next);
});

router.post('/logout', isSignin, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout success!');
});

module.exports = router;