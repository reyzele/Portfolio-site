const mongoose = require("mongoose");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.sa7yw.mongodb.net/${process.env.DB_PROJECT}`
  )
  .catch((e) => {
    console.error(e);
    throw e;
  });

let login = "";
let password = "";

rl.question("Login: ", (answer) => {
  login = answer;

  rl.question("Password: ", (answer) => {
    password = answer;
    rl.close();
  });
});

rl.on("close", () => {
  require("./models/user");

  const User = mongoose.model("user");
  const adminUser = new User({ login: login });

  adminUser.setPassword(password);

  User.findOne({ login: login })
    .then((u) => {
      if (u) {
        throw new Error("Such user already exists!");
      }

      return adminUser.save();
    })
    .then((u) => console.log("Ok!"), (e) => console.error(e.message))
    .then(() =>
      mongoose.connection.close(function() {
        process.exit(0);
      })
    );
});
