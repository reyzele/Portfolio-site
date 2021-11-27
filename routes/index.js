const express = require("express");
const router = express.Router();

const ctrlWelcome = require("../controllers/welcome");
const ctrlBlog = require("../controllers/blog");
const ctrlWorks = require("../controllers/works");
const ctrlAbout = require("../controllers/about");
const ctrlAdmin = require("../controllers/admin");

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

router.get("/blog", ctrlBlog.blog);

router.get("/works", ctrlWorks.works);
router.post("/", ctrlWorks.sendEmail);

router.get("/", ctrlWelcome.welcome);
router.post("/login", ctrlWelcome.auth);

router.get("/about", ctrlAbout.about);

router.get("/admin", isAuthenticated, ctrlAdmin.admin);
router.post("/admin/slides", isAuthenticated, ctrlAdmin.uploadSlide);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
