const http = require("request");
const config = require("../config/config.json");
const apiServer = config.server.path;

module.exports.about = function(req, res) {
  const pathApi = config.server.about;
  const requestOptions = {
    url: apiServer + pathApi,
    method: "GET",
    json: {},
  };
  const sendObj = {
    title: "About",
    isAuthorized: false,
  };

  if (req.isAuthenticated()) {
    sendObj.isAuthorized = true;
  }

  http(requestOptions, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    res.render("pages/about", Object.assign({}, sendObj, body));
  });
};
