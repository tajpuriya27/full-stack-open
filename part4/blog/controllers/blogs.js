const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  if (!req.body.likes) {
    req.body.likes = 0;
  }
  const blog = new Blog(req.body);
  try {
    const result = await blog.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
