import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Blog from "./Blog";

const Home = () => {
  const user = useSelector((state) => state.logedUser);
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <Blog blog={blog} />
          </Link>
        ))}
    </>
  );
};

export default Home;
