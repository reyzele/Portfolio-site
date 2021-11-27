const mongoose = require("mongoose");
const config = require("./config");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.sa7yw.mongodb.net/${process.env.DB_PROJECT}`
  )
  .catch((e) => {
    console.error(e);
    throw e;
  });

mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open mongodb");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

require("../api/models/avatar");
require("../api/models/blog");
require("../api/models/slide");
require("../api/models/skill");
require("../models/user");
