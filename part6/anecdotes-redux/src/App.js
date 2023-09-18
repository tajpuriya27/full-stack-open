import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { getAnecdotes } from "./services/anecdotes";
import { NotificationContextProvider } from "./NotificationContex";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setAnecdotes(result.data));
  }, [result.data, dispatch]);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.status === "error") {
    return <div>anecdotes service is not available due to server problem</div>;
  }

  return (
    <NotificationContextProvider>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </NotificationContextProvider>
  );
};

export default App;
