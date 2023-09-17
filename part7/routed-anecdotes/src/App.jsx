import { useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import { OneAnecdote } from "./components/AnecdoteList";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  //**** Understand below console-log and remove before submitting ********/
  const addNew = (anecdote) => {
    console.log(anecdote, "hehehe");
    anecdote.id = Math.round(Math.random() * 10000);
    console.log(anecdote, "hehehe");
    console.log("Before:", anecdotes);
    const updatedList = anecdotes.concat(anecdote);
    console.log("update:", updatedList);
    setAnecdotes(updatedList);
    console.log("After:", anecdotes);
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 1500);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdote/:id");
  const anecdoteOne = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Routes>
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdote/:id"
          element={<OneAnecdote anecdote={anecdoteOne} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
