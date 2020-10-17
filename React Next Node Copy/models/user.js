module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 설정 저장 기능?? 뭔소리야
  });
  
  User.associate = (db) => {
    db.User.hasMany(db.Post);
  }
  return User;
}