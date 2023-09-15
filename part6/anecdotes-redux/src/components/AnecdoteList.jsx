import { useSelector, useDispatch } from "react-redux";
import { upVoteOf } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const searchTerm = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upVoteOf(id));
  };

  const anecdotesToShow = searchTerm
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : anecdotes;

  anecdotesToShow.sort((a, b) => b.votes - a.votes);

  return (
    <>
      {anecdotesToShow.map((anecdote) => (
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
