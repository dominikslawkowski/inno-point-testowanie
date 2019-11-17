const https = require("https");
const crypto = require("crypto");
const queryString = require("querystring");
const request = require("request");

const gitConfig = require("../config/index").github;

class GitHubCalls {
  constructor() {}

  gitAuthWithPassword(username, password) {
    let base64Auth = Buffer.from(username + ":" + password).toString("base64");
    let optionsget = {
      host: "api.github.com",
      port: 443,
      path: "/user",
      method: "GET",
      headers: { "user-agent": "node.js", Authorization: "Basic " + base64Auth }
    };

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsget, function(res) {
        res.on("data", function(d) {
          console.info("GET result:\n");
          process.stdout.write(d);
          console.info("\n\nCall completed");
        });
        resolve(res.statusCode);
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitAuthWithToken(OAuthToken) {
    let optionsget = {
      host: "api.github.com",
      port: 443,
      path: "/user",
      method: "GET",
      headers: { "user-agent": "node.js", Authorization: "token " + OAuthToken }
    };

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsget, function(res) {
        res.on("data", function(d) {
          process.stdout.write(d);
        });
        resolve(res.statusCode);
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitAuthWithCallback(callback) {
    var unGuessableState = crypto.createHash("sha256");
    unGuessableState.update(Math.random().toString());

    let optionsget = {
      host: "github.com",
      port: 443,
      path: "/login/oauth/authorize",
      method: "GET",
      headers: {
        "user-agent": "node.js",
        Authorization: "Basic " + base64Auth
      },
      client_id: gitConfig.client_id,
      redirect_uri: callback,
      scope: "",
      state: unGuessableState,
      allow_signup: "true"
    };

    let reqGet = https.request(optionsget, function(res) {
      res.on("data", function(d) {
        process.stdout.write(d);
      });
      resolve(res.statusCode);
    });

    reqGet.end();
    reqGet.on("error", function(e) {
      reject(err);
    });

    return unGuessableState;
  }
  //method returning client id, name, email, avatar url || argument client generated token
  gitGetUserIdAndInfo(token) {
    let optionsGet = {
      host: "api.github.com",
      port: 443,
      path: "/user" + "?access_token=" + token,
      method: "GET",
      headers: {
        "user-agent": "node.js"
      }
    };

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsGet, function(res) {
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            const clientInfo = {
              clientId: parsedData.id,
              clientName: parsedData.name,
              clientEmail: parsedData.email,
              clientAvatar: parsedData.avatar_url,
              bio: parsedData.bio,
              hireable: parsedData.hireable,
              public_repos: parsedData.public_repos
            };
            resolve(clientInfo);
          } catch (e) {
            console.error(e.message);
          }
        });
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitPostGetUserToken(code) {
    return new Promise((resolve, reject) => {
      request.post(
        `${gitConfig.github_url_token}?client_id=${
          gitConfig.client_id
        }&client_secret=${gitConfig.client_secret}&code=${code}`,
        (error, response, body) => {
          const jsonWithToken = queryString.decode(body);

          if (error) {
            reject(err);
          }
          return resolve(jsonWithToken.access_token);
        }
      );
    });
  }

  gitPostCreateNewRepository(data) {
    const jsonObject = JSON.stringify({
      name: data.title,
      description: data.description,
      homepage: "https://github.com",
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
      auto_init: true
    });

    let optionsPost = {
      host: "api.github.com",
      port: 443,
      path: "/user/repos",
      method: "POST",
      headers: {
        "user-agent": "node.js ",
        Authorization: "token " + gitConfig.app_token,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonObject, "utf8")
      }
    };

    return new Promise((resolve, reject) => {
      let reqPost = https.request(optionsPost, function(res) {
        if (res.statusCode == 401 || res.statusCode == 403) {
          reject(401);
        }
        if (res.statusCode == 442) {
          reject(442);
        }

        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            const repoInfo = {
              repo_url: parsedData.html_url,
              repo_time_creation: parsedData.created_at
            };
            resolve(repoInfo);
          } catch (e) {
            console.error(e.message);
            reject(500);
          }
        });
      });

      reqPost.write(jsonObject);
      reqPost.end;
      reqPost.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitGetRepoAdditionsDeletions(data) {
    let optionsGet = {
      host: "api.github.com",
      port: 443,
      path:
        "/repos/" +
        gitConfig.owner +
        "/" +
        data.title +
        "/stats/code_frequency",
      method: "GET",
      headers: {
        "user-agent": "node.js "
      }
    };
    //  https://api.github.com/repos/nokia-wroclaw/innovativeproject-inno-point/stats/code_frequency

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsGet, function(res) {
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            if (rawData != []) {
              const parsedData = JSON.parse(rawData);

              const re = new RegExp("\\].\\[|,|\\[\\[|\\]\\]");
              let stats = rawData.split(re);

              let gitStats = {
                addition: stats[stats.length - 3],
                deletions: stats[stats.length - 2]
              };

              resolve(gitStats);
            } else {
              resolve(rawData);
            }
          } catch (e) {
            console.error(e.message);
          }
        });
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }
}

module.exports = GitHubCalls;
