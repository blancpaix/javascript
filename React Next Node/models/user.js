module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // mySQL 에서 User + s 해서 users 로 테이블 생성
    // id가 기본적으로 들어있다
    email: {
      type: DataTypes.STRING(30),  // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME ...
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',  // 한글 설정 (저장 가능)
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 사람이 포스트 많이 가질 수 있다!
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // Like table  as: 별칭, 대문자로 시작하면 좋음 // 컬럼: UserId, PostId...

    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });    // foreignKey 로 컬럼명 지정을 해줘 헷갈림 최소화
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User;
}