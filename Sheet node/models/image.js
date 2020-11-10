module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_Ci'
  });

  Image.associate = (db) => {
    db.Image.belongsTo(db.FreeBoard);
  };

  return Image;
}