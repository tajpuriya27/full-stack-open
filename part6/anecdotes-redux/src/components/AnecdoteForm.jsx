import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "../NotificationContex";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, contextDispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.concat(newAnecdote)
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.inputAnecdote.value;
    if (content.length > 5) {
      const anecdoteToAdd = { content, votes: 0 };
      newAnecdoteMutation.mutate(anecdoteToAdd);
      e.target.inputAnecdote.value = "";
      contextDispatch({
        type: "SET_NOTIFICATION",
        payload: `anecdote '${content}' is added`,
      });
      setTimeout(() => {
        contextDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 2000);
    } else {
      contextDispatch({
        type: "SET_NOTIFICATION",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        contextDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 2000);
    }
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="inputAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
