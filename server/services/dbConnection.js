const Sequelize = require("sequelize");
const config = require("../config").db;
const UserModel = require("../models/user");
const TeamModel = require("../models/team");
const ProjectModel = require("../models/project");
const NewsModel = require("../models/news");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: false
});

const User = UserModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const News = NewsModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


module.exports = { User, Team, Project, News , sequelize };



