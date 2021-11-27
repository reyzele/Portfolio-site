const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PicSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter your name"]
  },
  description: {
    type: String,
    required: [true, "Enter a description"]
  },
  picture: {
    type: String
  }
});

mongoose.model("avatar", PicSchema);
