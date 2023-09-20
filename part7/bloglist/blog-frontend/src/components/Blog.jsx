import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ blog }) => {
  return (
    <div style={blogStyle} className="blog-div">
      {blog.title} {blog.author}
    </div>
  );
};

const SingleBlog = ({ blogOne, updateLikes, delBlogProp, loggedInUser }) => {
  console.log("blog sent to singleBlog comp", blogOne);
  console.log("logged in user", loggedInUser);
  return (
    <div style={blogStyle} className="blog-div">
      <h1>{blogOne.title} </h1>
      <a href={blogOne.url}></a>
      <p>
        {blogOne.likes} likes
        <button
          onClick={() => updateLikes(blogOne)}
          id="like-blog"
          className="like-btn"
        >
          Like
        </button>
      </p>
      <br />
      added by {blogOne.author}
      <br />
      {blogOne.user.name}
      <br />
      {loggedInUser.username === blogOne.user.username && (
        <button onClick={delBlogProp} id="remove-blog">
          remove
        </button>
      )}
    </div>
  );
};

export { SingleBlog };

export default Blog;
