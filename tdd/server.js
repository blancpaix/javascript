const express = require('express');
const PORT = 5000;
const HOST = 'localhost';
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jeonggyun:1004@cluster0.xm9ud.mongodb.net/HELLO?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb connected')
).catch((err) => console.error(err));

const defaultRouter = require('./routes');

// POST 요청의 Body 부분 받음   // body Parser 가 내장됨
app.use(express.json());

app.use('/api/products', defaultRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 에러 핸들러는 미들웨어끝에다가 만들어둬요
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

// app.listen(PORT);
// console.log(`Running on port ${PORT}`);

module.exports = app;