const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./api-test-helper.js");
const blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("get method returns", () => {
  test("blogs as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct amount of blog post", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("unique identifier of blog", () => {
  test("is id not _id", async () => {
    const blogArr = await helper.blogsInDb();
    expect(blogArr[0].id).toBeDefined();
    expect(blogArr[0]._id).toBe(undefined);
  });

  test("is id is unique", async () => {
    const blogArr = await helper.blogsInDb();
    const idArr = blogArr.map((blog) => blog.id);
    const isDublicate = idArr.filter(
      (item, index) => idArr.indexOf(item) !== index
    );
    expect(isDublicate.length).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
