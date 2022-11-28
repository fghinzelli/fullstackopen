import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = event => {
    event.preventDefault();
    let formattedName = newName.trim();

    if (formattedName !== '') {
      if ((persons.filter(person => person.name === formattedName)).length > 0) {
        alert(`${formattedName} is already added to phonebook`)
      } else {
        const newPersons = persons.concat({ name: newName, number: newNumber })
        setPersons(newPersons)
        setFilteredPersons(newPersons.filter(person => (person.name.toUpperCase()).indexOf(filter.toUpperCase()) !== -1));
        setNewName('');
        setNewNumber('');
      }
    }
  }

  const handleFilterByName = event => {
    const txtFilter = event.target.value;
    setFilter(txtFilter);
    setFilteredPersons(persons.filter(person => (person.name.toUpperCase()).indexOf(txtFilter.toUpperCase()) !== -1));
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filter={filter} 
        filterByName={handleFilterByName} 
      />
      <h2>Add a new</h2>
      <PersonForm 
        name={newName} 
        changeName={e => setNewName(e.target.value)} 
        number={newNumber}
        changeNumber={e => setNewNumber(e.target.value)}
        submitForm={handleNewName}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App