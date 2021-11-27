const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.serializeUser(function(user, done) {
  console.log("serializeUser: ", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser: ", id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// локальная стратегия
passport.use(
  "loginUsers",
  new LocalStrategy(
    {
      usernameField: "login",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ login: username })
        .then((user) => {
          if (!user) {
            return done(null, false, req.flash("message", "User is not found"));
          }

          if (!user.validPassword(password)) {
            return done(null, false, req.flash("message", "Wrong password"));
          }

          return done(null, user);
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);
