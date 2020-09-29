const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');
const user = require('../models/user');
// const db = requir('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {   // GET /user
  console.log('header: ', req.headers); // 헤더에 쿠키가 없는거 확인
  // 쿠키가 없어서 현재 로그인 한 상태인지 확인이 불가능함
  try {
    if (req.user) {
      const userInfoSummary = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],   // 숫자만 셀것이라서 id 값만 가져오는데.. 그냥 카운트 하면 안되나?
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });
      res.status(200).json(userInfoSummary)
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  };
});



router.post('/', isNotLoggedIn, async (req, res, next) => {    // 비동기 함수인지는 문서참고해야 함
  console.log('req body 확인', req.body);
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    const password = await bcrypt.hash(req.body.password, 13);
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디오.');
      // 이게 saga 에서 err.response.data 가 됨
    }
    await User.create({
      email: req.body.email,
      nickname: req.body.display,
      password
    });
    // 차단은 브라우저가 하는데 허용은 서버에서 해줌

    res.status(200).send('ok');   // res.send('ok')
  } catch (err) {
    console.error(err);
    next(err);  // status 500
  }
});

// express 기법중 하나. 미들웨어 확장, 이 패턴 사용하세요~
// passport 사용해서 로그인 passport 에서 req, res 사용하려면 이렇게
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (msg) {
      return res.status(401).send(msg.reason);    // 401 비허가
    }
    return req.login(user, async (loginErr) => { // 이건 passport에서 로그인 에러 시
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // attributes: ['id', 'nickname', 'email', 'updatedAt'],
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings', // 관계 정의 시 사용했떤 대로
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    });
    res.status(200).json({ nickname: req.body.nickname })
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('그런 사람 없소.');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('그런 사람 없소.');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/follower/:userId/', isLoggedIn, async (req, res, next) => { // PATCH /user/follower/2
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('그런사람 없소.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
  try {
    let where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']],
        }]
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('그런사람 없소.');
    }
    // 시퀄라이즈 인데 복수로 하나 단수로하나.. 뭐 상관은 없을듯 복수는 일단 잘됨
    await user.addFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('그런사람 없소.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {   // GET /user
  try {
    if (req.params) {
      const userInfoSummary = await User.findOne({
        where: { id: req.params.userId },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],   // 숫자만 셀것이라서 id 값만 가져오는데.. 그냥 카운트 하면 안되나?
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });

      if (userInfoSummary) {
        // 우리가 쓸 수 잇는 데이터로 변환
        // 개인정보 보호
        const data = userInfoSummary.toJSON();
        data.Posts = data.Posts.length;
        data.Followers = data.Followers.length;
        data.Followings = data.Followings.length;
        res.status(200).json(data)
      } else {
        res.status(404).json('없는 회원이오');
      }
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  };
})

module.exports = router;    // COMMON JS 방식

// req/res : 헤더(상태, 용량, 시간, 쿠키), 바디(데이터) 로 구성됨
// 200 성공, 300 리다이렉트, 400 클라 에러, 500 서버 에러