const Notification = ({ notifyMsg }) => {
  if (notifyMsg === null) {
    return null;
  }
  return <div className="notification">{notifyMsg}</div>;
};

const ErrorMessage = ({ notifyMsg }) => {
  if (notifyMsg === null) {
    return null;
  }
  return <div className="error">{notifyMsg} </div>;
};

export default { Notification, ErrorMessage };
