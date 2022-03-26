import express from 'express';
import path from 'path';

const app = express();

const servers = [
  'http://localhost:3000',
  'http://localhost:3001',
];

let current = 0;

const handler = async (req, res) => {
  const { method, url, headers, body } = req;
  const server = servers[current];
  current === (servers.length - 1) ? current = 0 : current++;

  try {
    const response = await axios({
      url: `${server}${url}`,
      method,
      headers,
      data: body,
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send('server Error!');
  }
};

app.get('/favicon.ico', (req, res) => {
  res.status(404).end();
});

app.use((req, res) => handler(req, res));

app.listen(2000);