import { useState } from "react";
import { useSelector } from "react-redux";
import blogService from "../services/blogs";

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

const SingleBlog = ({ blogOne, updateLikes, delBlogProp }) => {
  const [userInput, setUserInput] = useState("");
  const loggedInUser = useSelector((state) => state.logedUser);

  const addComment = async (blogToComment) => {
    console.log("typed:", userInput);
    const comment = { comment: userInput };
    await blogService.commentBlog(blogToComment.id, comment);
  };

  if (loggedInUser) {
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
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={() => addComment(blogOne)}>add comment</button>
        {loggedInUser.username === blogOne.user.username && (
          <button onClick={delBlogProp} id="remove-blog">
            remove
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={blogStyle} className="blog-div">
      <h1>{blogOne.title} </h1>
      <a href={blogOne.url}></a>
      <p>
        {blogOne.likes} likes <i>log-in to like a blog</i>
      </p>
      added by {blogOne.author}
      <br />
      {blogOne.user.name}
    </div>
  );
};

export { SingleBlog };

export default Blog;
