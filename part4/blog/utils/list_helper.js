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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
