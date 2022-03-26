const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const path = require('path');
const cors = require('cors');
const db = require('./models');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

const app = express();

dotenv.config();
passportConfig();
db.sequelize.sync()
  .then(() => {
    console.log('[[ mySQL server connection Success ]]');
  })
  .catch(console.error);

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Who are you?');
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);

app.listen(3000, () => {
  console.log('[[ EXPRESS server on 3000 Port Runnnnnnnnning ]]')
})
