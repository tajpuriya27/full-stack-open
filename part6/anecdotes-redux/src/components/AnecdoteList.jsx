import { useSelector, useDispatch } from "react-redux";
import { upVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const searchTerm = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upVote(id));
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
