import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setFilteredPersons(response.data)
      })
  }, [])

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