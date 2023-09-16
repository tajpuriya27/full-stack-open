import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.inputAnecdote.value;
    const anecdoteToAdd = { content, votes: 0 };
    const response = await createAnecdote(anecdoteToAdd);
    dispatch(newAnecdote(response));
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
