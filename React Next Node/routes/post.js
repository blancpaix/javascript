const express = require('express');
const path = require('path'); // 이건 노드에서 제공
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('upload 폴더가 없어 생성함');
  fs.mkdir('uploads');
}

// 하드 저장시 스케일링 해주면 복사를 하는데 서버를 복사할때마다 이미지까지 복사를 해감 그게 문제
// 나중에 aws 배포하면서 s3에 저장을 할겨
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {  // samplle.png
      // 노드는 기본적으로 기존 파일을 덮어씀
      const ext = path.extname(file.originalname);  // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // sample
      done(null, basename + '_' + new Date().getTime() + ext);  // sample12321312.png 로 저장되겠찌?
    },
  }),
  // 용량 제한
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  // 이미지나 동영상은 만든 서버를 안거치는것을 추천
  // 서버 리소스 엄청 잡아먹음 왠만해서는 바로 클라우드로 올리는게 좋음 작은거는 이정도만해도 괜찮
});


router.get('/asdf', (req, res) => {
  res.json([
    { id: 1, content: 'Hello1' },
    { id: 2, content: 'Hello2' },
    { id: 3, content: 'Hello3' },
  ]);
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      UserId: req.user.id,   // 서버에서 정보를 다시 가져오기때문에 deserialize 필요
      content: req.body.content,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]] 형식이라서 v[0]을 해줌
      await post.addHashtags(result.map((v) => v[0]));
    };
    if (req.body.image) {
      // 파일은 DB에 파일 주소만 가짐, 파일은 캐싱을 하는데 CDN 속도 이점을 못얻기 때문에
      if (Array.isArray(req.body.image)) {  // 이미지 여러개 올리면 images: [1.png, 2.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {    // 하나만 올리면 images : 1.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    // 돌려줄때는 완벽하게 구성을 해서 돌려주네? 한번에 합쳐서?
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,    // COMMENT 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,    // POST작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User,    // LIKE 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err)
  }
});

// 동적으로 바뀌는 라우터 처리 :postId
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  console.log('이거 한번만,,', req);
  console.log('user id', req.user.id, req.user.email, req.user.nickname);
  console.log('session passport id', req.session.passport.user);
  console.log('content : ', req.body, 'param :', req.params);

  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('니가 썼나?');
    }
    const comment = await Comment.create({
      UserId: req.user.id,
      PostId: req.body.postId,  // 이걸로 접근
      content: req.body.content,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err)
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(403).send('게시글 없는데?');

    await post.addLikers(req.user.id);  // db 조작시에는 await 꼭 붙여
    // sql 에서 구현하려면 머리 좀 써야 한대
    res.json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(403).send('게시글 없는데?');

    await post.removeLikers(req.user.id);  // db 조작시에는 await 꼭 붙여~
    res.json({ postId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    // 이거 사용자 일치하는지 확인은... 밑에서 조건 하나 더걸어버리네
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    console.log('rtData - PostId :', parseInt(req.params.postId, 10));
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/images', upload.array('image'), isLoggedIn, async (req, res, next) => {    // POST /post/images
  // 한장만 올릴거면 upload.single('image), 텍스트: upload.none(), 여기서 먼저 업로드를 함 그 이후 포스트 작업 들어가는거임
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
  // 어떤 폼은 이미지 하나만 줄수도 있고 이미지+글, 이미지 여러개 등등 다양함
  // 그래서 앱에다가 적용을 하면 모든 라우터에 공통적으로 적용되기 때문에 라우터 하나하나씩 추가하는게 가볍게 하는데 효과적
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  console.log('req params: ', req.params);
  console.log('req body: ', req.body);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }]
    });
    if (!post) {
      return res.status(403).send('니가 썼나?');
    }
    // 자기것을 리트윗, 자기것을 남이 트윗한거를 다시 트윗 막음
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('내 글은 리트윗 할수 없소');
    }

    const retweetTargetId = post.RetweetId || post.id;  // null 이면 post.id 를 쓰겠다!
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId
      },
    });
    if (exPost) { // 이미 리트윗한거를 또 한번 더함?? 이런게안됨?
      return res.status(403).send('이미 리트윗 했소.')
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet'
    });
    const retweetWithPrevPost = await Post.findOne({
      // 너무 이게 커지면 dB 무리가니까 댓글같은거는 나중에 따로 요청하고 처리함, 요청 분산
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }],
      }],
    })
    res.status(201).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(err)
  }
});

router.get('/:postId', async (req, res, next) => { // GET /post/999
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    console.log('post', post);
    if (!post) return res.status(404).json('그 게시물은 없소');
    const fullPost = await Post.findOne({
      where: { id: post.id },    // 이건 뭐임?
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
    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
// export default router; 프론트에서는 import export 잘 씀
// 노드는 웹팩을 안쓰기 때문에 굳이 이렇게 쓸 필요는 없다