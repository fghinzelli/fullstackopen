const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const app = express();

app.use(express.static('build'))
app.use(cors())
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const SERVER_PORT = process.env.PORT || 3001 ;

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.post('/api/persons', (request, response) => {

  const body = request.body;
  
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Content missing' })
  } else {
    const person = persons.find(person => person.name === body.name)
    if (person) {
      return response.status(400).json({error: 'The Name already exists'})
    }
    const newPerson = {
      id: Math.round((Math.random() * 100) + 4),
      ...body
    }
    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
  }
});

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).send('Página não encontrada');
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
})

app.get('/info', (request, response) => {
  let now = new Date();
  response.write(`Phonebook has info for ${persons.length} people\n\n`)
  response.write(now.toString());
  response.end();
})

app.listen(SERVER_PORT, () => {
  console.log(`Server listen on port ${SERVER_PORT}`)
})