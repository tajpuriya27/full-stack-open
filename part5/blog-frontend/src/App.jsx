import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./main.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      // blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrMessage("Wrong credentials");
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      setErrMessage(err.response.data.error);
      if (err.response.data.error === "token expired") {
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
      }
    }
  };

  const handleChange = (e) => {
    setNewBlog(e.target.value);
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="error">{message}</div>;
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
