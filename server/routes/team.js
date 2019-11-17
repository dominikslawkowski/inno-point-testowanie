const { Team, User } = require("../services/dbConnection");
const SEQUELIZE = require("../services/dbConnection");
const sequelize = SEQUELIZE.sequelize;
const jwt = require("jsonwebtoken");
const config = require("../config");

const ClearanceCheck = require("../utils/cleranceCheck");
const clearanceCheck = new ClearanceCheck();

const ROLE = require("../utils/role");

const teamRoutes = app => {
  app.put("/teams", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, config.jwt.secretkey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        Team.findAll().then(result => {
          res.send(JSON.stringify(result));
        });
      }
    });
  });

  app.get("/teams/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Team.findAll({
      where: { id: id }
    }).then(result => {
      res.send(result);
    });
  });

  app.post("/teams", (req, res) => {
    if (req.body.team) {
      const { token, open, max_number_of_members } = req.body.team;
      jwt.verify(token, config.jwt.secretkey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          Team.findAll(
            { attributes: ["id"] },
            { order: [["id", "DESC"]] },
            { limit: 1 }
          )
            .then(result => {
              const id = result.row ? parseInt(result.row[0].id) + 1 : 0;
              return Team.bulkCreate([
                {
                  id,
                  leader_id: authData.id,
                  open,
                  max_number_of_members,
                  project_idL: null
                }
              ]);
            })
            .then(result => {
              User.update(
                { team_id: result[0].id, role: ROLE.LEADER },
                {
                  where: { id: authData.id }
                }
              );
            })
            .then(result => {
              res.send(result);
            });
        }
      });
    } else {
      res.sendStatus(403);
    }
  });

  app.delete("/teams/:id", (req, res) => {
    const team_id = parseInt(req.params.id);
    if (req.body.token) {
      const { token } = req.body;
      jwt.verify(token, config.jwt.secretkey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user_id = authData.id;
          clearanceCheck.isLeaderOrAdmin(user_id).then(result => {
            if (result == false) {
              res.sendStatus(403);
            } else {
              clearanceCheck.getRole(user_id).then(result => {
                if (result == ROLE.ADMIN) {
                  Team.findAll({ where: { id: team_id } }).then(result => {
                    const teamLeaderId = result[0].leader_id;
                    User.update(
                      { team_id: null, role: ROLE.DEVELOPER },
                      { where: { id: teamLeaderId } }
                    ).then(() => {
                      User.update(
                        { team_id: null },
                        { where: { team_id: team_id } }
                      ).then(() =>
                        Team.destroy({
                          where: { id: team_id }
                        }).then(
                          result => {
                            if (result == 1) res.sendStatus("200");
                          },
                          () => {
                            console.log(
                              "routes/teams - rejection when deleting team"
                            );
                            res.sendStatus("500");
                          }
                        )
                      );
                    });
                  });
                } else {
                  Team.findAll({ where: { id: team_id } }).then(result => {
                    if (result[0].leader_id == user_id) {
                      User.update(
                        { team_id: null },
                        { where: { team_id: team_id } }
                      )
                        .then(() => {
                          User.update(
                            { role: ROLE.DEVELOPER },
                            { where: { id: user_id } }
                          );
                        })
                        .then(() =>
                          Team.destroy({
                            where: { id: team_id }
                          })
                        )
                        .then(
                          result => {
                            if (result == 1) res.sendStatus("200");
                          },
                          () => {
                            console.log(
                              "routes/teams - rejection when deleting team"
                            );
                            res.sendStatus("500");
                          }
                        );
                    } else {
                      console.log("Cannot delete other users Team");
                      res.sendStatus(403);
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      res.sendStatus(403);
    }
  });

  app.put("/teams/:id/join", (req, res) => {
    const team_id = parseInt(req.params.id);
    if (req.body.token) {
      jwt.verify(req.body.token, config.jwt.secretkey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const user_id = authData.id;
          clearanceCheck.isDeveloperUp(user_id).then(result => {
            if (result == false) res.sendStatus(403);
            else {
              User.findAll({
                where: { id: user_id }
              }).then(result => {
                if (JSON.stringify(result[0].dataValues.team_id) === "null") {
                  sequelize
                    .query(
                      "SELECT COUNT(max_number_of_members) as current_num_of_members, max_number_of_members FROM user JOIN team ON user.team_id = team.id WHERE team_id='" +
                        team_id +
                        "'"
                    )
                    .then(([results, metadata]) => {
                      let current_members = results[0].current_num_of_members;
                      let max_members = results[0].max_number_of_members;

                      if (current_members < max_members) {
                        User.update(
                          { team_id: team_id },
                          {
                            where: { id: user_id }
                          }
                        ).then(() => res.sendStatus(200));
                      } else {
                        console.log("team full");
                        res.sendStatus(500);
                      }
                    });
                } else {
                  User.update(
                    { team_id: null },
                    {
                      where: { id: user_id }
                    }
                  ).then(() => res.sendStatus(200));
                }
              });
            }
          });
        }
      });
    } else {
      req.sendStatus(403);
    }
  });

  app.put("/teams/:id/status", (req, res) => {
    if (req.body.token) {
      const id = parseInt(req.params.id);
      const { token, status } = req.body;
      jwt.verify(token, config.jwt.secretkey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          Team.update(
            { open: status },
            {
              where: { id }
            }
          ).then(() => res.sendStatus(200));
        }
      });
    } else {
      req.sendStatus(403);
    }
  });
};

module.exports = teamRoutes;
