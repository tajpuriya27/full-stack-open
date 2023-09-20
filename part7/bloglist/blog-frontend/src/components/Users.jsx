import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);
  return <h1>User component</h1>;
};

export default Users;
