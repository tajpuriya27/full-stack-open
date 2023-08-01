const express = require("express");
const app = express();
persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const presentDate = new Date();
console.log(presentDate);
const personCount = persons.length;

app.get("/", (req, res) => {
  res.send(
    "<h1>Exe 3.1 completed.</h1> <a href='http://localhost:3001/api/persons'>Click here for API</a>"
  );
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

// info route
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${personCount} people, <br/> ${presentDate}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
