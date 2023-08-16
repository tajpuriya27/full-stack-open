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

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      person ? response.json(person) : response.status(404).send("wrong id");
    })
    .catch((error) => next(error));
});

app.get("/info", async (request, response) => {
  const docCount = await Person.countDocuments({});
  const currentTime = new Date(Date.now()).toString();
  response.send(
    `There are ${docCount} persons in database.<br/> ${currentTime}`
  );
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((res) => {
      res
        ? response.status(204).end()
        : response.status(404).send("already deleted!!");
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  Person.findByIdAndUpdate(id, body)
    .then((res) => {
      response.json(res);
    })
    .catch((error) => next(error));
});

// Error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
