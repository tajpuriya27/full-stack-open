import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notify);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: "0 0 10px 0",
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
