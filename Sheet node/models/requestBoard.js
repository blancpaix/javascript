module.exports = (sequelize, DataTypes) => {
  const RequestBoard = sequelize.define('requestboard', {
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
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  RequestBoard.associate = (db) => {
    db.RequestBoard.belongsTo(db.User, { foreignKey: { allowNull: false } });
    db.RequestBoard.hasMany(db.Comment);
  };

  return RequestBoard;
};
