import Redis from 'ioredis';
import { generateTasks } from './generateTask.js';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const BATCH_SIZE = 10000;
const redisClient = new Redis();

const [, , maxLength, searchHash] = process.argv;

async function main() {
  const generateObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE);
  for (const task of generateObj) {
    await redisClient.xadd('tasks_stream', 'task', JSON.stringify(task));   // xadd, 안정적인 메시징 설명했쬬
  };

  redisClient.disconnect();
};

main().catch(err => console.error(err));

