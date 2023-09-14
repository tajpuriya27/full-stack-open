import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";
import "./main.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    }
    user ? fetchData() : null;
  }, [user]);

  useEffect(() => {
    const tokenExpiry = window.localStorage.getItem("tokenExpiry");
    if (tokenExpiry && new Date() > tokenExpiry) {
      console.log("here");
      logOut("token-Expired");
    } else {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
      }
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    loginFormRef.current.toggleVisibility();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      let tokenExpirationTime = 1000 * 60 * 5;
      let tokenExpiry = Date.now() + tokenExpirationTime;
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      window.localStorage.setItem("tokenExpiry", tokenExpiry);
      blogService.setToken(user.token);
      setUser(user);
      setNotifyMessage(`${user.name} logged In`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 1000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrMessage("Wrong credentials");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrMessage(null);
      }, 3000);
    }
  };

  const logOut = (reason) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.localStorage.removeItem("tokenExpiry");
    setUser(null);
    reason === "token-expired"
      ? setNotifyMessage("Token Expired, logged out!!")
      : setNotifyMessage("User logged out.");
    setTimeout(() => {
      setNotifyMessage(null);
    }, 500);
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setNotifyMessage(
        `A new blog, "${response.title}" by ${response.author} added`
      );
      setTimeout(() => {
        setNotifyMessage(null);
      }, 2000);
    } catch (error) {
      setErrMessage(error.response.data.error);
      setTimeout(() => {
        if (error.response.data.error === "token expired") {
          logOut("token-expired");
        }
        setErrMessage(null);
      }, 500);
    }
  };

  const Notification = ({ type, message }) => {
    if (message === null) {
      return null;
    }
    return type === "errMessage" ? (
      <div className="error">{message}</div>
    ) : (
      <div className="notify">{message}</div>
    );
  };

  const updateLikes = async (blogToUpdate) => {
    blogToUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    try {
      const response = await blogService.update(blogToUpdate.id, blogToUpdate);
      setBlogs(blogs.map((n) => (n.id !== response.id ? n : response)));
    } catch (error) {
      setErrMessage(error.response.data.error);
      setTimeout(() => {
        if (error.response.data.error === "token expired") {
          logOut("token-expired");
        }
        setErrMessage(null);
      }, 500);
    }
  };

  const delBlog = async (blog) => {
    try {
      if (
        window.confirm(
          `Do you want to delete a blog, "${blog.title}" by ${blog.author}?`
        )
      ) {
        const response = await blogService.deleteBlog(blog.id);
        switch (response.status) {
          case 204: {
            setNotifyMessage(
              `A blog, "${blog.title}" by ${blog.author} is deleted!!!`
            );
            setTimeout(() => {
              setNotifyMessage(null);
            }, 1000);
            setBlogs(blogs.filter((n) => n.id !== blog.id));
            break;
          }
          case 401: {
            setErrMessage(
              `Authentication Error: A blog, "${blog.title}" by ${blog.author} cannot be deleted!!!`
            );
            setTimeout(() => {
              setErrMessage(null);
            }, 500);
            break;
          }
          default: {
            setNotifyMessage("unknown Error!!");
            setTimeout(() => {
              setNotifyMessage(null);
            }, 1000);
            break;
          }
        }
      }
    } catch (error) {
      setErrMessage(error.response.data.error);
      setTimeout(() => {
        setErrMessage(null);
      }, 500);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="Show Login" ref={loginFormRef}>
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="Show Blog Form" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        type={errMessage ? "errMessage" : "notifyMessage"}
        message={errMessage || notifyMessage}
      />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>Log out</button>
          </p>

          {blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={() => updateLikes(blog)}
                delBlog={() => delBlog(blog)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
