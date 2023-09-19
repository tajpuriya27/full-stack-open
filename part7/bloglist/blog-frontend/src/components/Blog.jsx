import { useState } from "react";

const Blog = ({ blog, updateLikes, delBlogProp, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [blogToShow, setBlogToShow] = useState([]);
  if (blogToShow.includes(blog.id)) {
    return (
      <div style={blogStyle} className="blog-div">
        <p>
          {blog.title}
          <button
            onClick={() =>
              setBlogToShow(blogToShow.filter((id) => id !== blog.id))
            }
          >
            hide
          </button>
          <br />
          URL: {blog.url}
          <br />
          Likes: {blog.likes}{" "}
          <button onClick={updateLikes} id="like-blog" className="like-btn">
            Like
          </button>
          <br />
          {blog.author}
          <br />
          {blog.user.name}
          <br />
          {loggedInUser.username === blog.user.username && (
            <button onClick={delBlogProp} id="remove-blog">
              remove
            </button>
          )}
        </p>
      </div>
    );
  }
  return (
    <div style={blogStyle} className="blog-div">
      {blog.title} {blog.author}
      <button
        onClick={() => setBlogToShow(blogToShow.concat(blog.id))}
        className="show-btn"
      >
        show
      </button>
    </div>
  );
};

export default Blog;
