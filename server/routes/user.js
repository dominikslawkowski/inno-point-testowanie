const { User } = require("../services/dbConnection");
const jwt = require("jsonwebtoken");
const config = require("../config");

const ClearanceCheck = require("../utils/cleranceCheck");
const clearanceCheck = new ClearanceCheck();

const ROLE = require("../utils/role");

const userRoutes = app => {
  app.put("/user", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { id } = authData;
        clearanceCheck.isDeveloperUp(id).then(result => {
          if (result == false) res.sets(403);
          else {
            User.findAll({
              where: { id }
            }).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });

  app.put("/users", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        User.findAll({
          attributes: [
            "id",
            "name",
            "surname",
            "email",
            "team_id",
            "github_picture"
          ]
        }).then(result => {
          res.send(result);
        });
      }
    });
  });

  app.get("/users/:id", (req, res) => {
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            const id = parseInt(req.params.id);
            User.findAll({
              where: { id: id }
            }).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });

  app.post("/users", (req, res) => {
    const { name, surname } = req.body;
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.findAll({
              attributes: ["id"],
              order: [["id", "DESC"]],
              limit: 1
            })
              .then(result => {
                const id = result.row ? parseInt(result.row[0].id) + 1 : 0;
                return User.bulkCreate([
                  {
                    id: id,
                    name: name,
                    surname: surname
                  }
                ]);
              })
              .then(result => {
                res.send(result);
              });
          }
        });
      }
    });
  });

  app.put("/user/updateInfo", (req, res) => {
    const { token, name, surname, email } = req.body;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { id } = authData;
        clearanceCheck.isDeveloperUp(id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.findAll({
              where: { id }
            }).then(result => {
              if (result.length > 0) {
                User.update(
                  {
                    name,
                    surname,
                    email
                  },
                  { where: { id } }
                ).then(result => {
                  res.send(result);
                });
              } else {
                res.status(500).send(result);
              }
            });
          }
        });
      }
    });
  });

  app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname, team_id } = req.body;
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isDeveloperUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.update(
              {
                name: name,
                surname: surname,
                team_id: team_id
              },
              { where: { id: user_id } }
            ).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });

  app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isDeveloperUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.destroy({
              where: { id: id }
            }).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });

  app.post("/users/:id", (req, res) => {
    const role = req.body.role;
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.findAll({
              attributes: ["id"],
              order: [["id", "DESC"]],
              limit: 1
            })
              .then(result => {
                const id = result.row ? parseInt(result.row[0].id) + 1 : 0;
                return User.bulkCreate([
                  {
                    id: id,
                    role: role
                  }
                ]);
              })
              .then(result => {
                res.send(result);
              });
          }
        });
      }
    });
  });

  app.put("/user/:id/promoteToMentor", (req, res) => {
    console.log(req.body);

    const role = ROLE.MENTOR;
    const token = req.body.token;
    const id = req.params.id;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            User.findAll({ where: { id: id } }).then(result => {
              if (result[0].dataValues.role == ROLE.DEVELOPER) {
                User.update(
                  {
                    role: role
                  },
                  { where: { id: id } }
                ).then(result => {
                  res.send(result);
                });
              } else {
                console.log(
                  "User cannot be promoted because he is not a developer"
                );
                res.sendStatus(500);
              }
            });
          }
        });
      }
    });
  });

  app.put("/user/:id/updateBio", (req, res) => {
    const token = req.body.token;
    const bio = req.body.bio;
    const id = parseInt(req.params.id);
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false && id != user_id) res.sendStatus(403);
          else {
            User.update(
              {
                bio: bio
              },
              { where: { id: user_id } }
            ).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });

  app.put("/users/:id", (req, res) => {
    const { token } = req.body.token;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_id = authData.id;
        clearanceCheck.isAdminUp(user_id).then(result => {
          if (result == false) res.sendStatus(403);
          else {
            const id = parseInt(req.params.id);
            const role = req.body;
            User.update(
              {
                role: role
              },
              { where: { id: id } }
            ).then(result => {
              res.send(result);
            });
          }
        });
      }
    });
  });
};

module.exports = userRoutes;
