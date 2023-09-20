import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((n) => (
          <tr key={n.id}>
            <td>{n.name}</td>
            <td>{n.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
