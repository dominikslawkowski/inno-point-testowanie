/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.CHAR(50),
			allowNull: true
		},
		short_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		long_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		team_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'team',
				key: 'id'
			}
		},
		goals: {
			type: DataTypes.CHAR(255),
			allowNull: true,
			defaultValue: ''
		},
		scopes: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		number_of_members: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		technology: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		tags: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		mentor_id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		requirements: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		academic_contact_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		theme_color: {
			type: DataTypes.CHAR(11),
			allowNull: true
		},
		verified: {
			type: DataTypes.INTEGER(4).UNSIGNED,
			allowNull: true
		}
	}, {
		tableName: 'project',
		timestamps: false,
	});
};
