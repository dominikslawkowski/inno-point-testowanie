const projectRoutes = require("./project");
const userRoutes = require("./user");
const teamRoutes = require("./team");
const githubRoutes = require("./github");
const mailServieRoutes = require("./mailer");
const newsRoutes = require("./news");

const initializeRoutes = app => {
  projectRoutes(app);
  userRoutes(app);
  githubRoutes(app);
  mailServieRoutes(app);
  teamRoutes(app);
  newsRoutes(app);
};

module.exports = initializeRoutes;
