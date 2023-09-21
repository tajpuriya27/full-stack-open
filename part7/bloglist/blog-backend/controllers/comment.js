const commentRouter = require("express").Router();
const Comment = require("../models/comment");

commentRouter.get("/", async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments);
});

module.exports = commentRouter;
