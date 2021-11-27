const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  WorksSchema = new Schema({
    name: {
      type: String,
      required: [true, "Enter a description of the project."]
    },
    tech: {
      type: String,
      required: [true, "Enter the technologies used in project"]
    },
    link: {
      type: String,
      required: [true, "Enter the link"]
    },
    picture: {
      type: String
    }
  });

mongoose.model("slide", WorksSchema);
