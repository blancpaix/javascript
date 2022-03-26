module.exports = (sequelize, DataTypes) => {
  const NoticeBoard = sequelize.define('noticeboard', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  NoticeBoard.associate = (db) => {
    db.NoticeBoard.belongsTo(db.User, { foreignKey: { allowNull: false } });
  };

  return NoticeBoard;
};
