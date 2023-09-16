import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { resetNotification, setNotification } from "../reducers/notifyReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const searchTerm = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const { content } = anecdote;
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(voteAnecdote(anecdoteToUpdate));
    dispatch(setNotification(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 1500);
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
