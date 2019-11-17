const jwt = require("jsonwebtoken");
const config = require("../config");

const Models = require("../services/dbConnection");
const News = Models.News;
const Project = Models.Project;

const ClearanceCheck = require("../utils/cleranceCheck");
const clearanceCheck = new ClearanceCheck();

const newsRoutes = app => {
  app.put("/news", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isDeveloperUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            News.findAll().then(result => {
              res.send(JSON.stringify(result));
            });
          }
        });
      }
    });
  });

  app.post("/news", (req, res) => {
    let token = req.body.token;

    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { title, body } = req.body.news;
        const user_id = authData.id;
        clearanceCheck.isDeveloperUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            News.findAll({
              attributes: ["id"],
              order: [["id", "DESC"]],
              limit: 1
            }).then(result => {
              const news_id = result.row ? parseInt(result.row[0].id) + 1 : 0;

              return News.bulkCreate([
                {
                  id: news_id,
                  title,
                  body,
                  user_id,
                  date: new Date()
                }
              ]).then(() => res.sendStatus(200));
            });
          }
        });
      }
    });
  });
};

module.exports = newsRoutes;
