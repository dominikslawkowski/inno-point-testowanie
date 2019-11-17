const Models = require("../services/dbConnection");
const User = Models.User;

const ROLE = require("./role");

class CleranceCheck {
  constructor() {}

  getRole(userId) {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: { id: userId },
        raw: true
      }).then(result => {
        //        console.log(JSON.parse(JSON.stringify(result[0])).role);
        resolve(JSON.parse(JSON.stringify(result[0])).role);
        reject("ERROR");
      });
    });
  }

  isDeveloperUp(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (
          role == ROLE.DEVELOPER ||
          role == ROLE.ACADEMIC ||
          role == ROLE.LEADER ||
          role == ROLE.MENTOR ||
          role == ROLE.ADMIN
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
      resolve(true);
    });
  }

  isMentorUp(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (role == ROLE.MENTOR || role == ROLE.ADMIN) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  isAdminUp(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (role == ROLE.ADMIN) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  isLeaderUp(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (role == ROLE.LEADER || role == ROLE.MENTOR || role == ROLE.ADMIN) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  isAcademicUp(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (
          role == ROLE.MENTOR ||
          role == ROLE.ADMIN ||
          role == ROLE.ACADEMIC
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  isLeaderOrAdmin(userId) {
    return new Promise((resolve, reject) => {
      this.getRole(userId).then(role => {
        if (role == ROLE.LEADER || role == ROLE.ADMIN) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

module.exports = CleranceCheck;
