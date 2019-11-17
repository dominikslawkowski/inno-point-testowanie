/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "news",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      reaction_happy: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      reaction_sad: { type: DataTypes.INTEGER(11), allowNull: true },
      reaction_wow: { type: DataTypes.INTEGER(11), allowNull: true },
      users_happy: { type: DataTypes.CHAR(200), allowNull: true },
      users_sad: { type: DataTypes.CHAR(200), allowNull: true },
      users_wow: { type: DataTypes.CHAR(200), allowNull: true },
      date: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        references: {
          model: "user",
          key: "id"
        }
      }
    },
    {
      tableName: "news",
      timestamps: false
    }
  );
};
