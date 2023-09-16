import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.payload;
    }
    case "RESET_NOTIFICATION": {
      return "Notification goes here";
    }
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "notification goes here..."
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
