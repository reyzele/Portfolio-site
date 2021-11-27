const express = require("express");
const router = express.Router();

const ctrlBlog = require("../controllers/blog");
const ctrlAvatar = require("../controllers/avatar");
const ctrlAbout = require("../controllers/about");
const ctrlWorks = require("../controllers/works");

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized", error: 401 });
};

router.get("/avatar", ctrlAvatar.getAvatar);
router.post("/avatar", ctrlAvatar.setAvatar);

router.get("/blog", ctrlBlog.getBlog);
router.post("/blog", isAuthenticated, ctrlBlog.createArticle);
router.put("/blog/:id", isAuthenticated, ctrlBlog.editArticle);
router.delete("/blog/:id", isAuthenticated, ctrlBlog.deleteArticle);

router.get("/works", ctrlWorks.getWorks);
router.post("/works", ctrlWorks.setSlide);

router.get("/about", ctrlAbout.getSkills);
router.post("/about", ctrlAbout.addNewSkill);
router.put("/about/:id", ctrlAbout.editSkill);
router.delete("/about/:id", ctrlAbout.deleteSkill);

router.get("*", (req, res) => {
  res.status(404).json({ msg: "Not found", err: 404 });
});

module.exports = router;
