import { useContext } from "react";
import NotificationContext from "../NotificationContex";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: "0 0 10px 0",
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
