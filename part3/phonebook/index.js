const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
// app.use(morgan("combined"));
app.use(express.static("dist"));

morgan.token("post", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms :post"
);
app.use(morgan("postFormat"));

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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

const generateId = () => Math.round(Math.random() * 1000);
const isDublicate = (checkName) =>
  persons.map((n) => n.name).includes(checkName);

app.post("/api/persons", (req, res) => {
  const sentData = req.body;
  if (!sentData.name || !sentData.number) {
    return res.status(400).json({ error: "content missing" });
  } else if (isDublicate(sentData.name)) {
    return res.status(400).json({ error: "name already exist" });
  }
  const person = {
    id: generateId(),
    name: sentData.name,
    number: sentData.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

// info route
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${personCount} people, <br/> ${presentDate}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
