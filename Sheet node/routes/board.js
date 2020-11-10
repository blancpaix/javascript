const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const { Image, NoticeBoard, FreeBoard, User } = require('../models');
const { isSignin } = require('./authMiddleware');
const { Op } = require('sequelize');

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('upload폴더 없어, 생성할겨');
  fs.mkdir('uploads', err => console.error(err));
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get('/', async (req, res, next) => {
  console.log('이거는 찍히니?');
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }

    const posts = await FreeBoard.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      inlcude: [{
        model: User,
        attributes: ['id', 'displayName'],
      }, {
        model: Image,
      }]
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.post('/uploadImage', upload.array('image'), isSignin, async (req, res, next) => {
  res.json(req.files.map(v => v.filename));
});

router.post('/', isSignin, upload.none(), async (req, res, next) => {
  console.log('req.body\n', req.body, '\n req.user', req.user);
  const { title, content, type } = req.body;
  try {
    const post = await FreeBoard.create({
      UserId: req.user.id,
      title,
      content,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        )
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    };

    const returnPost = await FreeBoard.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: User,
        attributes: ['id', 'displayName'],
      }]
    })
    res.status(201).json(returnPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;