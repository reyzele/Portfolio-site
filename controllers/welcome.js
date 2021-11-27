const passport = require("passport");
const config = require("../config/config.json");
const http = require("request");
const apiServer = config.server.path;

module.exports.welcome = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }

  const pathAPI = config.server.avatar;
  const requestOptions = {
    url: apiServer + pathAPI,
    method: "GET",
    json: {},
  };
  const sendObj = {
    title: "Welcome",
    msg: req.flash("message"),
  };

  http(requestOptions, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    res.render("pages/index", Object.assign({}, sendObj, body));
  });
};

module.exports.auth = function(req, res, next) {
  if (req.body.isHuman !== true) {
    return res.json({
      msg: "You have not confirmed that you are human!",
      status: "Error",
    });
  }

  if (req.body.isRealHuman !== "yes") {
    return res.json({
      msg: "You are a man, but you are not sure about it...",
      status: "Error",
    });
  }
  passport.authenticate("loginUsers", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({
        msg: "Enter the correct username and password!",
        status: "Error",
      });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.json({
        msg: "Go to the admin panel...",
        status: "Error",
      });
    });
  })(req, res, next);
};
