const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Enter article title"]
  },
  body: {
    type: String,
    required: [true, "Enter article description"]
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Enter the date of publication"]
  }
});

mongoose.model("blog", BlogSchema);
