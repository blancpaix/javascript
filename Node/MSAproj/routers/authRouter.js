import express from 'express';
const router = express.Router();

const users = [
  { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' },
  { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' },
  { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];

function loadUser(req, res, next) {
  const user = users[req.params.id];
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('Fail to load user : ', req.params.id));
  }
};

function logger(req, res, next) {
  console.log('Time : ', Date.now());
  next();
};

router.use(logger);



router.get('/', (req, res) => {
  res.end('you want to join us?');
});

router.get('/:id', loadUser, (req, res) => {
  console.log('req.params', req.params);
  // dynamic params => req.params 으로 입력
  res.send(users[req.params.id])
});

router.get('/data/:dataId', (req, res) => {
  console.log('req.params', req.params);
  res.send('this');
});

router.route('/better/:id')
  .get((req, res) => {
    console.log('much better GET!');
    res.end('much better GET!');
  })
  .post((req, res) => {
    console.log('PUT!', req.params);
    res.send(req.params);
  });


export default router;


/*
  promise 로 함수 시작햇으면
  .catch(next) 로 next를 명시적으로 호출하고 프라미스를 종료시켜야 함
*/