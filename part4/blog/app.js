const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error occured while connecting to DB.", error);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
