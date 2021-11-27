const mongoose = require("mongoose");
const config = require("../../config/config");

module.exports.getWorks = function(req, res) {
  const avatar = {
    name: "Veksler Vadim",
    description: "Web developer personal site",
    picture: "/images/avatar.jpg",
  };
  const slides = [
    {
      name: "Site Horse Side Vet Guide",
      tech: "html5, css3, javascript, ReactJS",
      link: "http://example.com",
      picture: "/images/slider/1.png",
    },
    {
      name: "Site Mr. Burger",
      tech: "html5, css3, javascript",
      link: "http://example.com",
      picture: "/images/slider/2.png",
    },
  ];

  let sendObj = {};

  const picture = mongoose.model("avatar");
  const works = mongoose.model("slide");

  works
    .find()
    .then((items) => {
      if (!items.length) {
        sendObj = Object.assign({}, sendObj, { slides: slides });
      } else {
        sendObj = Object.assign({}, sendObj, { slides: items });
      }
      return sendObj;
    })
    .then((temp) => {
      picture.findOne().then(
        (item) => {
          if (!item) {
            sendObj = Object.assign({}, temp, { avatar: avatar });
            res.status(200).json(sendObj);
          } else {
            sendObj = Object.assign({}, temp, { avatar: item });
            res.status(200).json(sendObj);
          }
        },
        (err) => {
          sendObj = Object.assign({}, temp, {
            message: err.message,
            error: err,
          });
          res.status(200).json(sendObj);
        }
      );
    });
};

module.exports.setSlide = function(req, res) {
  if (req.get("secure") === process.env.SECURE) {
    const Model = mongoose.model("slide");
    const item = new Model({
      name: req.body.name,
      tech: req.body.tech,
      link: req.body.link,
      picture: req.body.picture,
    });
    item
      .save()
      .then(
        (pic) => res.status(201).json(pic),
        (e) => res.status(400).json({ message: e.message, error: e })
      );
  } else {
    res.status(401).json({ message: "Unauthorized", error: 401 });
  }
};
