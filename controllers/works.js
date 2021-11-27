const nodemailer = require("nodemailer");
const config = require("../config/config.json");
const http = require("request");
const apiServer = config.server.path;

module.exports.works = function(req, res) {
  const pathApi = config.server.works;
  const requestOptions = {
    url: apiServer + pathApi,
    method: "GET",
    json: {},
  };
  const sendObj = {
    title: "Works",
    isAuthorized: false,
  };

  if (req.isAuthenticated()) {
    sendObj.isAuthorized = true;
  }

  http(requestOptions, function(error, response, body) {
    res.render("pages/works", Object.assign({}, sendObj, body));
  });
};

module.exports.sendEmail = function(req, res, next) {
  if (!req.body.name || !req.body.email || !req.body.text) {
    return res.json({ msg: "All fields must be filled!", status: "Error" });
  }

  const mailSmtp = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(mailSmtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: process.env.MAIL_USER,
    subject: config.mail.subject,
    text:
      req.body.text.trim().slice(0, 500) + `\n Sent from: <${req.body.email}>`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.json({
        msg: `When you send an error has occurred!: ${error}`,
        status: "Error",
      });
    }

    res.json({ msg: "Thank you for message!", status: "Ok" });
  });
};
