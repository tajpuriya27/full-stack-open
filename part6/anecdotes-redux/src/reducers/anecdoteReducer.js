import { createSlice } from "@reduxjs/toolkit";

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

export const { upVote, appendAnecdote, setAnecdotes } = anecdoteReducer.actions;
export default anecdoteReducer.reducer;
