const mongoose = require("mongoose");

module.exports.getBlog = function(req, res) {
  const avatar = {
    name: "Veksler Vadim",
    description: "Web developer personal site",
    picture: "/images/avatar.jpg",
  };
  const picture = mongoose.model("avatar");
  const blog = mongoose.model("blog");

  let sendObj = {};
  const defaultArticle = [
    {
      title: "Lorem ipsum...",
      date: "2-1-2019",
      body: "Lorem ipsumr...",
    },
  ];

  blog
    .find()
    .then(
      (items) => {
        console.log(items);

        if (!items.length) {
          sendObj = Object.assign({}, sendObj, { articles: defaultArticle });
        } else {
          sendObj = Object.assign({}, sendObj, { articles: items });
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

module.exports.createArticle = function(req, res) {
  const Model = mongoose.model("blog");
  const item = new Model({
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text,
  });

  item.save().then(
    (item) => {
      return res.status(201).json({ status: "Article successfully added" });
    },
    (err) => {
      res.status(404).json({
        status: "An error occurred while adding the article: " + err,
      });
    }
  );
};

module.exports.editArticle = function(req, res) {
  const id = req.params.id;

  let data = {
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text,
  };

  const Model = mongoose.model("blog");

  Model.findByIdAndUpdate(id, { $set: data })
    .then((item) => {
      if (item) {
        res.status(200).json({ status: "Article successfully updated" });
      } else {
        res.status(404).json({ status: "Article not found in DB" });
      }
    })
    .catch((err) => {
      res.status(404).json({
        status: "An error occurred while updating the article: " + err,
      });
    });
};

module.exports.deleteArticle = function(req, res) {
  const id = req.params.id;
  const Model = mongoose.model("blog");

  Model.findByIdAndRemove(id).then(
    (item) => {
      if (item) {
        res.status(200).json({ status: "Article successfully deleted" });
      } else {
        res.status(404).json({ status: "Article not found in DB" });
      }
    },
    (err) => {
      res.status(404).json({
        status: "An error occurred while deleting the article " + err,
      });
    }
  );
};
