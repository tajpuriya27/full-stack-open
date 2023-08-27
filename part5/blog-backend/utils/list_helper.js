const dummy = (blogs) => {
  return Array.isArray(blogs) ? 1 : 0;
};

const totalLikes = (blogs) => {
  let likeCount = 0;
  if (blogs.length > 1) {
    blogs.forEach((blog) => {
      likeCount += blog.likes;
    });
  } else if (blogs.length === 1) {
    likeCount = blogs[0].likes;
  }

  return likeCount;
};

const favouriteBlog = (blogs) => {
  let highestLike = 0;
  let blogWithHighestLike;
  blogs.forEach((blog) => {
    if (blog.likes > highestLike) {
      highestLike = blog.likes;
      blogWithHighestLike = blog;
    }
  });
  return {
    title: blogWithHighestLike.title,
    author: blogWithHighestLike.author,
    likes: blogWithHighestLike.likes,
  };
};

const mostBlogs = (blogs) => {
  let tempObj = {};
  blogs.forEach((blog) => {
    if (blog.author in tempObj) {
      tempObj[blog.author]++;
    } else {
      tempObj[blog.author] = 1;
    }
  });
  let authorBlogs = 0,
    author = "";
  for (const [key, value] of Object.entries(tempObj)) {
    if (value > authorBlogs) {
      authorBlogs = value;
      author = key;
    }
  }
  return { author, blogs: authorBlogs };
};

const mostLikes = (blogs) => {
  let tempObj = {};
  blogs.forEach((blog) => {
    if (blog.author in tempObj) {
      tempObj[blog.author] += blog.likes;
    } else {
      tempObj[blog.author] = blog.likes;
    }
  });
  let authorLike = 0,
    author = "";
  for (const [key, value] of Object.entries(tempObj)) {
    if (value > authorLike) {
      authorLike = value;
      author = key;
    }
  }
  return { author, likes: authorLike };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
