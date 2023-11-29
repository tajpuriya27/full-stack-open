const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find()
    .populate({ path: "user", model: User })
    .populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "user",
        model: User,
        select: "username -_id",
      },
    });

  // const blogs = await Blog.find({})
  //   .populate("user", "id")
  //   .populate("comments", { comment: 1 });

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

blogsRouter.post(
  "/:id/comments",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const user = req.user;
      const blog = req.params.id;
      // console.log(user);
      console.log("checking", req.body);
      const comment = new Comment({
        comment: req.body.comment,
        user: user.id,
        blog,
      });

      const result = await comment.save();
      const blogToComment = await Blog.findById(blog);
      console.log("returned after saved", result);
      blogToComment.comments = blogToComment.comments.concat(result._id);
      await blogToComment.save();

      res.status(201).json(result);
    } catch (exception) {
      next(exception);
    }
  }
);

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
    console.log("checking", req.body);
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
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
