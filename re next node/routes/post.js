const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const { User, Post, Image, Comment } = require('../models');
const { isNotSignin, isSignin } = require('./middleware');

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('upload 폴더가 없어서 생성할겨');
  fs.mkdir('uploads', (err) => console.error(err));
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
  limits: { fileSize: 12 * 1024 * 1024 },
});

// upload 하면서 이미 들어갔는데 그 이후 미들웨어 isSignin 에서 막혀버리는데 이게 문제임
router.post('/images', upload.array('image'), isSignin, async (req, res, next) => {
  console.log('이거 확인 한번만 제발,...', req.isAuthenticated());
  console.log('req.session?', req.session.passport);
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

router.post('/', isSignin, upload.none(), async (req, res, next) => {
  try {
    console.log('/post -req.body \n', req.body)
    const hashtag = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    if (hashtag) {
      // 여기다가 대충 해시태그끼리 묶어주는거 하나씩 넣어주고
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map(image =>
          Image.create({ src: image })));
        await post.addImages(images)
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const returnPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: User,
        attributes: ['id', 'displayName'],
      }]
    });
    res.status(200).json(returnPost);
  } catch (err) {
    console.error(err);
    next();
  }
});
router.delete('/:postId', isSignin, async (req, res, next) => {
  try {
    console.log('rtData-PostId : ', parseInt(req.params.postId, 10));
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id
      }
    })
    // 이건 뭐인거여? 이걸 삭제하고 왜 돌려줌? 돌려준거 받아서 필터링해주려고?
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.post('/:postId/comment', isSignin, async (req, res, next) => {
  console.log('req.params //\n', req.params, 'req.body // \n', req.body);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return res.status(403).send('그른거 없다')
    const comment = await Comment.create({
      UserId: req.user.id,
      PostId: req.body.postId,
      content: req.body.content,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'displayName'],
      }],
    })

    res.status(200).json(fullComment);

  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId/like', isSignin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) return res.status(403).send('그런거 없는데?');
    await post.addLikers(req.user.id);
    res.json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/like', isSignin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) return res.status(403).send('그런거 없는데?');
    await post.removeLikers(req.user.id);
    res.json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;