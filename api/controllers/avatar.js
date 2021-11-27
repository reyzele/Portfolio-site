const mongoose = require("mongoose");
const config = require("../../config/config");

module.exports.getAvatar = function(req, res) {
  const avatar = {
    name: "Veksler Vadim",
    description: "Web developer personal site",
    picture: "/images/avatar.jpg",
  };
  const picture = mongoose.model("avatar");

  picture.findOne().then((item) => {
    if (!item) {
      res.status(200).json(avatar);
    } else {
      res.status(200).json(item);
    }
  });
};

module.exports.setAvatar = function(req, res) {
  if (req.get("secure") === process.env.SECURE) {
    const Model = mongoose.model("avatar");

    Model.remove({}, (err) => {
      if (err)
        return res.status(400).json({ message: err.message, error: err });

      const item = new Model({
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture,
      });

      item
        .save()
        .then(
          (pic) => res.status(201).json(pic),
          (e) => res.status(400).json({ message: e.message, error: e })
        );
    });
  } else {
    res.status(401).json({ message: "Unauthorized", error: 401 });
  }
};
