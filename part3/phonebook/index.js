const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config;
const Person = require("./model/person");

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

app.get("/", (req, res) => {
  res.send("Static Files - failed rendered");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      person ? response.json(person) : response.status(404).send("wrong id");
    })
    .catch((error) => {
      response.status(404).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((res) => {
      res
        ? response.status(204).end()
        : response.status(404).send("already deleted!!");
    })
    .catch((error) => {
      response.status(404).send({ error: "malformated id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  Person.findByIdAndUpdate(id, body)
    .then((res) => {
      response.json(res);
    })
    .catch((error) => {
      response.status(404).send({ error: "malformated id" });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
