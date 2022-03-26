import express from 'express';
import portFinder from 'portfinder';
import { nanoid } from 'nanoid';
import morgan from 'morgan';

import ConsulManager from './utils/consulManager.js';
import payIndexRouter from './routers/pay_indexRouter.js';

async function main() {
  const serviceType = process.argv[2];
  const { pid } = process;
  const PORT = await portFinder.getPortPromise();
  const serviceId = nanoid();
  const ADDRESS = process.env.ADDRESS || 'localhost';

  const paymentConsul = new ConsulManager(serviceType, serviceId, ADDRESS, PORT);

  process.on('SIGINT', (data) => {
    console.log('SIGINT data', data);
    paymentConsul.unregisterService(data)
  });
  process.on('uncaughtException', (data) => {
    console.log('SIGINT data', data);
    paymentConsul.unregisterService(data)
  });
  process.on('exit', (data) => {
    console.log('exit data', data);
    paymentConsul.unregisterService(data)
  });

  const app = express();

  app.use(morgan('dev'));

  app.use('/pay', payIndexRouter);
  app.use((req, res, next) => {
    const err = new Error('404, NOT FOUND');
    err.status = 404;
    next(err);
  });

  app.listen(PORT, () => {
    paymentConsul.registerService();
    console.log(`Started ${serviceType} at ${pid} on port : ${PORT}`);
  })

  setTimeout(() => {
    process.exit(1);
  }, 10000)
};

main().catch(err => {
  console.error('err in payment-service', err);
});