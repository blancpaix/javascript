const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": "1004",
    "database": "knote_db01",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
}