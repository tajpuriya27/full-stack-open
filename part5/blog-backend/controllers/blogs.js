const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", tokenExtractor, userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user.id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    res.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const user = req.user;
      const blog = await Blog.findById(req.params.id);

      if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id);
        res.status(204).send("Blog deleted");
      } else {
        res.status(401).send("Unauthorized deletion tried");
      }
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put("/:id", async (req, res, next) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    }).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// testing purpose only:

// blogsRouter.get("/all", async (req, res, next) => {
//   try {
//     await Blog.deleteMany({});
//     res.status(204).send("deleted all");
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = blogsRouter;
