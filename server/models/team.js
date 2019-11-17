module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "team",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      leader_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: "user",
          key: "id"
        }
      },
      project_id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        references: {
          model: "project",
          key: "id"
        }
      },
      open: {
        type: DataTypes.TINYINT(11).UNSIGNED,
        allowNull: true
      },
      max_number_of_members: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true
      }
    },

    {
      tableName: "team",
      timestamps: false
    }
  );
};
