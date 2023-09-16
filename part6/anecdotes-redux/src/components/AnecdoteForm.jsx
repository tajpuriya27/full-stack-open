import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

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
    const anecdoteToAdd = { content, votes: 0 };
    newAnecdoteMutation.mutate(anecdoteToAdd);
    e.target.inputAnecdote.value = "";
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
