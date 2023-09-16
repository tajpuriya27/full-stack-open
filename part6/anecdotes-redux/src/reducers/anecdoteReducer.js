import { createSlice } from "@reduxjs/toolkit";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    upVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    newAnecdote(state, action) {
      return state.concat(action.payload);
    },
    initializeAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { upVote, newAnecdote, initializeAnecdote } =
  anecdoteReducer.actions;
export default anecdoteReducer.reducer;
