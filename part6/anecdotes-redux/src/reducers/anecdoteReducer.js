import { createSlice } from "@reduxjs/toolkit";
import { createAnecdote, upVoteAnecdote } from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    upVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const addAnecdote = (anecdoteToAdd) => {
  return async (dispatch) => {
    const addedAnecdote = await createAnecdote(anecdoteToAdd);
    dispatch(appendAnecdote(addedAnecdote));
  };
};

export const voteAnecdote = (anecdoteToUpdate) => {
  return async (dispatch) => {
    const response = await upVoteAnecdote(anecdoteToUpdate);
    dispatch(upVote(response));
  };
};

export const { upVote, appendAnecdote, setAnecdotes } = anecdoteReducer.actions;
export default anecdoteReducer.reducer;
