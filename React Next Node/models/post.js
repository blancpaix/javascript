module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // mySQL 에서 User + s 해서 users 로 테이블 생성
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // mb4 까지 더하면 한글 + 이모티콘 사용 가능
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 포스트는 유저에 속함(작성자)   // post.addUser, post.getUser, post.removeUser
    db.Post.hasMany(db.Comment);    // post.addComments   // 관계에 따라서 시퀄라이즈가 이런거 만들어줌
    db.Post.hasMany(db.Image);    // post.addImages
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });  // n:m 양방향 belongsToMany   // post.addHashtags
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });   // Like table   // post.addLikers라는게 생기는데 뭔말임? post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' });   // 리트윗    // post.addRetweet
  };
  return Post;
}