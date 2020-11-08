module.exports = (sequelize, DataTypes) => {
  const Buy = sequelize.define('Buy', {
    buyAy: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    paranoid: false
  });

  Buy.associate = (db) => {
    db.Buy.belongsTo(db.User, { allowNull: false });
    db.Buy.belongsTo(db.Sheet, { allowNull: false });
  }

  return Buy;
}