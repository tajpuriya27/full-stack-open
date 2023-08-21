const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);
