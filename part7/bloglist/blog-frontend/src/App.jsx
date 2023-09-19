import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification, setError } from "./reducers/notifyReducer";
import {
  initializeBlogs,
  createUpdateBlog,
  updateLikeOfBlog,
  delBlog,
} from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import "./main.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notifyingMsg = useSelector((state) => state.notify.notification);
  const errMessage = useSelector((state) => state.notify.err);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      dispatch(initializeBlogs());
    }
    user ? fetchData() : null;
  }, [user]);

  useEffect(() => {
    const tokenExpiry = window.localStorage.getItem("tokenExpiry");
    if (tokenExpiry && new Date() > tokenExpiry) {
      logOut("token-Expired");
    } else {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
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
      dispatch(setUser(user));
      dispatch(setNotification(`${user.name} logged In`, 1500));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setError("Wrong credentials", 3000));
      setUsername("");
      setPassword("");
    }
  };

  const logOut = (reason) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.localStorage.removeItem("tokenExpiry");
    dispatch(setUser(null));
    reason === "token-expired"
      ? dispatch(setNotification("Token Expired, logged out!!", 1500))
      : dispatch(setNotification("User logged out.", 1500));
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createUpdateBlog(newBlog));
      dispatch(
        setNotification(
          `A new blog, "${response.title}" by ${response.author} added`,
          1500
        )
      );
    } catch (error) {
      dispatch(setError(error.response.data.error, 3000));
      setTimeout(() => {
        if (error.response.data.error === "token expired") {
          logOut("token-expired");
        }
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
      dispatch(updateLikeOfBlog(blogToUpdate));
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

  const delBlogFun = async (blog) => {
    try {
      if (
        window.confirm(
          `Do you want to delete a blog, "${blog.title}" by ${blog.author}?`
        )
      ) {
        dispatch(delBlog(blog));
      }
    } catch (error) {
      dispatch(setError("error.response.data.error", 3000));
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
        type={errMessage ? "errMessage" : "notifyingMsg"}
        message={errMessage || notifyingMsg}
      />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>Log out</button>
          </p>

          {blogForm()}
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={() => updateLikes(blog)}
                delBlogProp={() => delBlogFun(blog)}
                loggedInUser={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
