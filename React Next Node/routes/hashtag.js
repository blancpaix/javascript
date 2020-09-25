const express = require('express');
const { Hashtag, User, Post, Comment, Image } = require('../models');
const router = express.Router();


router.get('/:hashtag', async (req, res, next) => { // GET /hashtag/alpha
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{ // 해시태그는 테이블이 따로 있음
        model: Hashtag,
        where: { name: req.params.hashtag },    // include 한 애 에서 조건을 적용 할 수 잇음 위 아래 조건 다 만족
      }, {
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

module.exports = router;