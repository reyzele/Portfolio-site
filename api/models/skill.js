const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
  id: { type: Number },
  type: {
    type: Number,
    default: 1
  },
  name: { type: String },
  percents: {
    type: Number,
    default: 0
  }
});

mongoose.model("skill", AboutSchema);
