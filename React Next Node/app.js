const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const db = require('./models');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const app = express();
const passportConfig = require('./passport');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');

dotenv.config();  // 동기화 그리고 json 파일에는 적용 안되서 js 로 변환 필요
passportConfig();
db.sequelize.sync()
  .then(() => {
    console.log('mySQL DB server Connection Success.');
  })
  .catch(console.error)

// use 안에 들어가는것들을 미들웨어라고 합니다 그 순서들도 중요합니다

// fs 를 익스프레스 서버가 사용할 수 있도록 설정을 해줘야 함 __dirname 은 현재 폴더를 말함 'C:\\'+ 이렇게 안쓰고 join 씀 os 마다 경로가 다름!
app.use('/', express.static(path.join(__dirname, 'uploads'))); // /은 외부접속시 보여지는 경로 (폴더 구조 외부 노출X)
app.use(morgan('dev'));

// cors() 모든 CORS 문제 개방 res.setHeader('Access-Control-Allow-ORigin, '*'); 이게 들어감
app.use(cors({
  origin: 'http://localhost:3000',    // '*' 이렇게 하면 모두 허용, http://localhost:3000/
  credentials: true,   // 이거 설정하면서 위의 * 옵션은 적용 안됨 
}));

// 프론트에서 넣은 req.body 를 사용할 수 있도록   // 라우터보다 상단에 위치 필수
// 보통 두개 연결해서 많이 씀
app.use(express.json());  // json 형식의 데이터 req.body 에 넣음
app.use(express.urlencoded({ extended: true }));  // form submit urlencoded 방식으로 데이터 처리
// multipart/form-data 는 위의 설정으로는 받지 못함 그래서 설정이 필요
// multer 사용해야 위의 형식 처리 가능

// 미들웨어 4개 필요함 서버에서 유저 정보를 다 가지고 있는게 아니고 key-value 구조로만 가짐 쿠키로??
app.use(cookieParser(process.env.COOKIE_SECRET));
// 세션 설정
app.use(session({
  saveUninitialized: false, // true 로 할 일이 그닥 많지는 않음
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('서버 침투 훈련!');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);


// 에러 처리 미들웨어 위치 마지막, 에러페이지 특이하게 처리하고 싶다면 이렇게 써
// app.use((err, req, res, next) => { });

app.listen(3001, () => {
  console.log('Node EXPRESS server is running on 3001...');
}); 