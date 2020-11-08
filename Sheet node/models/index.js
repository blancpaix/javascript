const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.FreeBoard = require('./freeBoard')(sequelize, Sequelize);
db.NoticeBoard = require('./noticeBoard')(sequelize, Sequelize);
db.RequestBoard = require('./requestBoard')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Music = require('./music')(sequelize, Sequelize);
db.Sheet = require('./sheet')(sequelize, Sequelize);
db.Buy = require('./buy')(sequelize, Sequelize);


Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
