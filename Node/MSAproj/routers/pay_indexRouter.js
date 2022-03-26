import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.end('뭐라는거여');
});


export default router;
