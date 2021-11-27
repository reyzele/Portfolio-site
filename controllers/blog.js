const http = require("request");
const config = require("../config/config.json");
const apiServer = config.server.path;

module.exports.blog = function(req, res) {
  const pathApi = config.server.blog;
  const requestOptions = {
    url: apiServer + pathApi,
    method: "GET",
    json: {},
  };
  const sendObj = {
    title: "Blog",
    isAuthorized: false,
  };

  if (req.isAuthenticated()) {
    sendObj.isAuthorized = true;
  }

  http(requestOptions, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    res.render("pages/blog", Object.assign({}, sendObj, body));
  });
};
