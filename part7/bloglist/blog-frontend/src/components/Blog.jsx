import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ blog, updateLikes, delBlogProp, loggedInUser }) => {
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

const SingleBlog = ({ blogOne, updateLikes21 }) => {
  return (
    <div style={blogStyle} className="blog-div">
      <h1>{blogOne.title} </h1>
      <a href={blogOne.url}></a>
      <p>
        {blogOne.likes} likes
        <button
          onClick={() => updateLikes21(blogOne)}
          id="like-blog"
          className="like-btn"
        >
          Like
        </button>
      </p>
      <br />
      added by {blogOne.author}
    </div>
  );
};

export { SingleBlog };

export default Blog;
