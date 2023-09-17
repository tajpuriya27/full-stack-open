import { Link } from "react-router-dom";

export const OneAnecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    has {anecdote.votes} votes <br />
    for more info see: <a href={anecdote.info}>{anecdote.info}</a>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
