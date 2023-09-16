import { useDispatch } from "react-redux";
import { anecdoteFilterFrom } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  const filterAnecdotes = (event) => {
    dispatch(anecdoteFilterFrom(event.target.value));
  };

  return (
    <>
      filter{" "}
      <input type="text" name="inputToFilter" onChange={filterAnecdotes} />
    </>
  );
};

export default AnecdoteFilter;
