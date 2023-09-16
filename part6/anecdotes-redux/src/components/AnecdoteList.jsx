import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { notifyTimeout } from "../reducers/notifyReducer";
import { upVoteAnecdote } from "../services/anecdotes";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const searchTerm = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation(upVoteAnecdote, {
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      );
    },
  });

  const vote = (anecdote) => {
    const { content } = anecdote;
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    voteAnecdoteMutation.mutate(anecdoteToUpdate);
    dispatch(notifyTimeout(`you voted '${content}'`, 1));
  };

  const anecdotesToShow = searchTerm
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : anecdotes;

  const sortedAnecdotes = [...anecdotesToShow];
  sortedAnecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
