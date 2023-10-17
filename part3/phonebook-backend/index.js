require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const app = express();

app.use(express.static('build'))
app.use(cors())
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const SERVER_PORT = process.env.PORT;

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
})

app.post('/api/persons', (request, response) => {

  const body = request.body;
  
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Content missing' })
  } 
    
  const newPerson = new Person({...body})

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404)
      next()
    }
  })
  .catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => response.status(204).end())
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  let now = new Date();
  Person.find({}).then(persons => {
    response.write(`Phonebook has info for ${persons.length} people\n\n`)
    response.write(now.toString());
    response.end();
  }).catch(error =>  response.write('Erro ao buscar os dados: ', error.message))
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}


app.use(errorHandler)


app.listen(SERVER_PORT, () => {
  console.log(`Server listen on port ${SERVER_PORT}`)
})