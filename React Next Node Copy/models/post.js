module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    // mb4: 한글 + 이모티콘
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User); 
  };

  return Post;
}