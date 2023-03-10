const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
const persons = [
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
app.use(morgan(":method :url :response-time :req[headers]"));

app.get("/api/info", (request, response) => {
  const info = `Phonebook has info for ${persons.length} people `;
  const date = Date();
  response.send(`<p>${info}</p> <p>${date}</p>`);
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("id", id, "type", typeof id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(400).end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  const person = {
    name: name,
    number: number,
    id: generateId(),
  };

  const isNameExist = persons.find((person) => {
    return person.name === name;
  });
  if (!name || !number) {
    response.status(400).json({
      error: "name or number missing",
    });
  } else if (isNameExist) {
    response.status(400).json({
      error: `name  already exists`,
    });
  } else {
    response.json(person);
  }
});

const PORT = 3001;
app.listen(PORT);
console.log("port running on port:: ", PORT);
