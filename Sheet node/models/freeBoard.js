module.exports = (sequelize, DataTypes) => {
  const FreeBoard = sequelize.define('freeboard', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  FreeBoard.associate = (db) => {
    db.FreeBoard.belongsTo(db.User, { foreignKey: { allowNull: false } });
    db.FreeBoard.hasMany(db.Comment);
    db.FreeBoard.hasMany(db.Image);
  };

  return FreeBoard;
};
