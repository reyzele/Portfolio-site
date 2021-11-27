const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const http = require("request");
const config = require("../config/config.json");
const apiServer = config.server.path;

module.exports.admin = function(req, res) {
  res.render("pages/admin", {
    title: "Admin panel",
  });
};

module.exports.uploadSlide = function(req, res) {
  const form = new formidable.IncomingForm();
  const upload = "public/upload";
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({ msg: "Failed to upload image", status: "Error" });
    }
    
    if (!fields.name) {
      fs.unlink(files.photo.path);
      return res.json({
        msg: "Picture description is not specified!",
        status: "Error",
      });
    }

    fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function(err) {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(files.photo.path, fileName);
      }

      const pathApi = config.server.works;
      let dir = fileName.replace(/public\W+/, "");

      const requestOptions = {
        url: apiServer + pathApi,
        method: "POST",
        json: {
          name: fields.name,
          tech: fields.tech,
          link: fields.link,
          picture: dir,
        },
        headers: {
          secure: process.env.SECURE,
        },
      };

      http(requestOptions, function(error, response, body) {
        if (error || body.error) {
          const msg = error
            ? "The picture is not saved in the DB" + error
            : body.msg + " " + body.error;
          return res.json({ msg: msg, status: "Error" });
        }

        res.json({ msg: "Picture loaded successfully", status: "Ok" });
      });
    });
  });
};
