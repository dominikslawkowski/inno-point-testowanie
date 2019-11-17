const nodemailer = require("nodemailer");
const config = require("../config").mailer;
const mustache = require("mustache");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: config.mailerHost,
  port: config.mailerPort,
  secure: false,
  auth: {
    user: config.mailerAccount,
    pass: config.mailerPassword
  }
});

class MailService {
  constructor() {}

  async requestMentorStatus(data) {
    var filePath = path.join(
      __dirname,
      "../email_templates/requestMentorStatus.html"
    );

    var fs = require("fs");
    var file = fs.readFileSync(filePath, "utf8");

    var insertData = {
      userName: data.userName,
      userId: data.userId
    };

    var processedHTML = mustache.to_html(file, insertData); // replace all of the data

    let mailOptions = {
      from: '"Test inno point noreply" <' + config.mailerAccount + ">", // sender address
      to: data.recipientEmails, // list of receivers
      subject: "New mentor status request", // Subject line
      text: "", // plain text body
      html: processedHTML // html body
    };

    let info = await transporter.sendMail(mailOptions);
  }

  async requestTopicReview(data) {
    var filePath = path.join(
      __dirname,
      "../email_templates/requestTopicReview.html"
    );

    var fs = require("fs");
    var file = fs.readFileSync(filePath, "utf8");

    var insertData = {
      projectName: data.projectName,
      projectId: data.projectId
    };

    var processedHTML = mustache.to_html(file, insertData); // replace all of the data

    let mailOptions = {
      from: '"Test inno point noreply" <' + config.mailerAccount + ">", // sender address
      to: data.recipientEmails, // list of receivers
      subject: "New topic review request", // Subject line
      text: "", // plain text body
      html: processedHTML // html body
    };

    let info = await transporter.sendMail(mailOptions);
  }
}

module.exports = MailService;
