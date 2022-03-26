module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    musicIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    // 밑에가 앨범으로 묶여야 할거 같고
    artist: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    albumTitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    releaseData: {
      type: DataTypes.DATE,
      allowNull: true
    },
    coverImg: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    paranoid: false,
  });

  Music.associate = (db) => {
    db.Music.hasOne(db.Sheet);
  };

  return Music;
}