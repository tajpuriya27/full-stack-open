const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./api-test-helper.js");
const blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("get method returns", () => {
  test("status code 200 and blogs as json", async () => {
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

describe("adding a new blog", () => {
  test("valid blog can be added sucessfully with status code 201", async () => {
    const newblog = {
      title: "Added by test-case",
      author: "Sunil Tajpuriya",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newblog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Added by test-case");
  });

  test("if like property is missing, intialized it with zero and returns status code 201.", async () => {
    const newblog = {
      title: "Missing likes property",
      author: "Sunil Tajpuriya",
      url: "https://reactpatterns.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newblog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  test("blog without title is is discarded", async () => {
    const newblog = {
      author: "Sunil Tajpuriya",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api.post("/api/blogs").send(newblog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("blog without url is is discarded", async () => {
    const newblog = {
      title: "Blog withou url must be discarded",
      author: "Sunil Tajpuriya",
      likes: 7,
    };

    await api.post("/api/blogs").send(newblog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
