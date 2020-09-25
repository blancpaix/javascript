// 단수랑 복수랑 얘는 구분을 철저하게 하는 편이라서.... 이거는 대량 처리를 위해서 복수로 나눴네
const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    let where = {};
    // queryString 이라서 req.query 로 받음
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
      // id가 last id 보다 작은걸로 10개를 불러와라! 그러면 맞네..
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      // 실무에서는 limit, offset 잘 안씀. 데이터가 바뀌어서 이게 좀 다름 key가 절대적이지 못함
      // offset: 100, // 1~10  11~20... 101~110
      // lastId 를 쓰는데 이거는 임의로 구현한것임
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


router.get('/:userId', async (req, res, next) => { // GET /posts/userId?lastId=0
  console.log('req.params', req.params);
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      attributes: ['id']
    });
    console.log('user', user);
    if (!user) return res.status(404).json('그 유저는 없소');

    const fullPost = await Post.findAll({
      where: { UserId: user.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
        order: [['createdAt', 'ASC']]
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
        attributes: ['id', 'nickname'],
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
    console.log('fullPost', fullPost);

    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;