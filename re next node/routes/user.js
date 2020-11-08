const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isNotSignin, isSignin } = require('./middleware');

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('req.body \n', req.body);
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email }
    });
    if (exUser) {
      return res.status(403).send('your Email is already joined.');
    }
    const password = await bcrypt.hash(req.body.password, 13);
    console.log('password generating', password);
    await User.create({
      email: req.body.email,
      password,
      displayName: req.body.displayName
    });

    res.status(200).send('join success.');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, msg) => {
      if (err) {
        console.error(err);
        return next(err);
      };
      if (msg) {
        return res.status(401).send(msg.reason);
      }
      // console.log('user /signin', err, user, msg);
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const UserExcepPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password']
          }
        });
        return res.status(200).json(UserExcepPassword);
      })
    })(req, res, next)
    // 위에거 주의합시다 이거때문에 시간 날림...
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/logout', isSignin, async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('logout Success!');
})

module.exports = router;