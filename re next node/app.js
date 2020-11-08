const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const passportConfig = require('./passport');
const db = require('./models');
const morgan = require('morgan');
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

dotenv.config();
passportConfig();
db.sequelize.sync()
  .then(() => {
    console.log('mySQL server Connection Success');
  })
  .catch(console.error);

app.use('/', express.static(path.join(__dirname, 'uploads')));  // 디렉터리 구조 파악 방지
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:4000',    // 여기는 Next 서버 포트 써야할듯
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  // secure: true,
}));
// passport 시작점 위치를 쿠키하고 세션 모두 설정 한 이후로 시작을 해야 오류가 안뜸 아니면 개고생했네 아...
app.use(passport.initialize());
app.use(passport.session());


app.get('/test', (req, res) => {
  res.send('Testing...');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3000, () => {
  console.log('EXPRESS server is running on 3000..');
});
