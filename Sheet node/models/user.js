module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allwNull: false
    },
    displayName: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    credit: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      defaultValue: 0
      // 뭐 사실상 결제는 페이팔로 할 예정이니까 사실 있으나 마나 아님?
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  User.associate = (db) => {
    db.User.hasMany(db.FreeBoard);
    db.User.hasMany(db.RequestBoard);
    db.User.hasMany(db.NoticeBoard);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Buy);
  };

  return User;
}