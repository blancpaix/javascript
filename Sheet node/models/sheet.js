module.exports = (sequelize, DataTypes) => {
  const Sheet = sequelize.define('Sheet', {
    key: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    sampleFilename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'sample.pdf'
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '2000',
    },
    buyCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    paranoid: false
  });

  Sheet.associate = (db) => {
    db.Sheet.belongsTo(db.Music, { foreignKey: { allowNull: false } });
    db.Sheet.hasMany(db.Buy);
  };

  return Sheet;
}