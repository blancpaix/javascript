const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./models');
const app = express();

const passportConfig = require('./passport');

const userRouter = require('./routes/user');

dotenv.config();
passportConfig();
db.sequelize.sync()
  .then(() => console.log('[mySQL DB Connection Success]'))
  .catch(console.error);
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));
app.use(express.json());
// multer 사용 설정, multipart/form-data의 form submit 요청 처리
app.use(express.urlencoded({ extended: true }))

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_CHARACTER
}));
// Initialize Passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());


app.get('/welcome', (req, res) => {
  res.send('어여왕~!');
})
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('[EXPRESS server is running on 3000]');
});