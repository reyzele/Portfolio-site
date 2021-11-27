const mongoose = require("mongoose");

module.exports.getSkills = function(req, res) {
  const avatar = {
    name: "Veksler Vadim",
    description: "Web developer personal site",
    picture: "/images/avatar.jpg",
  };
  const defaultSkills = [
    {
      id: 1,
      type: 1,
      name: "HTML5",
      percents: "90",
    },
    {
      id: 2,
      type: 1,
      name: "CSS3",
      percents: "90",
    },
    {
      id: 3,
      type: 1,
      name: "JavaScript & jQuery",
      percents: "80",
    },
    {
      id: 4,
      type: 1,
      name: "React & Vue",
      percents: "80",
    },
    {
      id: 5,
      type: 2,
      name: "PHP",
      percents: "30",
    },
    {
      id: 6,
      type: 2,
      name: "mySQL",
      percents: "40",
    },
    {
      id: 7,
      type: 2,
      name: "Node.js & npm",
      percents: "60",
    },
    {
      id: 8,
      type: 2,
      name: "Mongo.db",
      percents: "50",
    },
    {
      id: 9,
      type: 3,
      name: "Git",
      percents: "100",
    },
    {
      id: 10,
      type: 3,
      name: "Gulp",
      percents: "70",
    },
    {
      id: 11,
      type: 3,
      name: "Bower",
      percents: "80",
    },
  ];
  const picture = mongoose.model("avatar");
  const skills = mongoose.model("skill");

  let sendObj = {};

  skills
    .find()
    .then(
      (items) => {
        if (!items.length) {
          sendObj = Object.assign({}, sendObj, {
            skills: defaultSkills,
            default: true,
          });
        } else {
          sendObj = Object.assign({}, sendObj, {
            skills: items,
            default: false,
          });
        }

        return sendObj;
      },
      (err) => {
        sendObj = Object.assign({}, sendObj, {
          articles: { message: err.message, error: err },
        });
        return sendObj;
      }
    )
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

module.exports.addNewSkill = function(req, res) {
  const Model = mongoose.model("skill");
  const item = new Model({
    id: new Date().getUTCMilliseconds(),
    type: req.body.type,
    name: req.body.name,
    percents: req.body.percents,
  });

  item.save().then(
    (item) => {
      return res.status(201).json({ status: "Skills successfully added" });
    },
    (err) => {
      // обрабатываем  и отправляем
      res.status(404).json({
        status: "Error occurred during skill add: " + err,
      });
    }
  );
};

module.exports.editSkill = function(req, res) {
  const id = req.params.id;

  let data = {
    percents: req.body.percents,
  };

  const Model = mongoose.model("skill");

  Model.findByIdAndUpdate(id, { $set: data })
    .then((item) => {
      if (item) {
        res.status(200).json({ status: "Skills successfully eddited" });
      } else {
        res.status(404).json({ status: "Something is going wrong..." });
      }
    })
    .catch((err) => {
      res.status(404).json({
        status: "Something is going wrong during edditing: " + err,
      });
    });
};

module.exports.deleteSkill = function(req, res) {
  const id = req.params.id;
  const Model = mongoose.model("skill");

  Model.findByIdAndRemove(id).then(
    (item) => {
      if (item) {
        res.status(200).json({ status: "Skill successfully deleted" });
      } else {
        res
          .status(404)
          .json({ status: "Skill with such id is not found in DB" });
      }
    },
    (err) => {
      res.status(404).json({
        status: "Something is going wrong during deleting: " + err,
      });
    }
  );
};
