const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state from reducer", state);
  switch (action.type) {
    case "UP-VOTE": {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: ++anecdote.votes }
          : anecdote
      );
    }
    case "FILTER-ANECDOTE": {
      // console.log("filter outside");
      if (action.payload) {
        // console.log("filter inside");
        return state.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
      return state;
    }
    case "NEW-ANECDOTE": {
      return state.concat(action.payload);
    }

    default:
      return state;
  }
};

export const upVoteOf = (id) => {
  return {
    type: "UP-VOTE",
    payload: id,
  };
};

export const newAnecdoteOf = (content) => {
  return {
    type: "NEW-ANECDOTE",
    payload: asObject(content),
  };
};

export const anecdoteFilterFrom = (searchTerm) => {
  return {
    type: "FILTER-ANECDOTE",
    payload: searchTerm,
  };
};

export default reducer;
