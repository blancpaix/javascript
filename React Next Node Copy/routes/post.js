const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const { Post, User, Hashtag }  = require('../models');
const { isLogin, isNotLogin } = require('./passportSession');
const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.error('CREATE uploads DIRECTORY');
  fs.mkdir('uploads', (err) => {
    console.error(err);
  });
};
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
  limits: { fileSize: 16 * 1024 * 1024 },
});

// 이미지 업로드 /post/images
router.post('/image', isLogin, upload.array('image'), async (req, res, next) => {
  // 한장: upload.single('image') // 텍스트: upload.none()
  console.log('req.files // ', req.files);
  res.json(req.files.map((el) => el.filename));
});

// 글쓰기 /post
router.post('/', isLogin, upload.none(), async (req, res, next) => {
  console.log('req.headers //', req.headers);
  console.log('req.body // ', req.body);
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      UserId: req.user.id,  // 서버에서 정보를 다시 가져오기대믄에 deserialize
      content: req.body.content,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await post.addHshtags(result.map((el) => el[0])); // addHashtag get 이런거는 기본적으로 지원하는 기능인가봐
    };
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.iamge.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    };

    const fullPost = await Post.findOne({
      where: { id: post.id },
    });
    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;