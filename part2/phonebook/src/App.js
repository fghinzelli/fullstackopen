import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsApi from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    personsApi.getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const handleNewName = event => {
    event.preventDefault();
    let formattedName = newName.trim();

    let newPerson = { 
      name: formattedName, 
      number: newNumber 
    }
    
    if (newPerson.name !== '') {
      let filtredList = persons.filter(person => person.name === newPerson.name)
      if (filtredList.length > 0) {
        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          personsApi.update(filtredList[0].id, newPerson)
          .then(updatedPerson => {
            const newList = persons.filter(person => person.name !== newPerson.name).concat(updatedPerson.data)
            updateLists(newList)
          })
        }
      } else {
        personsApi.create(newPerson)
        .then(response => {
          const newPersons = persons.concat(response.data)
          updateLists(newPersons)
        })
      }
    }
  }

  const updateLists = (newList) => {
    setPersons(newList)
    setFilteredPersons(newList.filter(person => (person.name.toUpperCase()).indexOf(filter.toUpperCase()) !== -1));
    setNewName('');
    setNewNumber('');
  }

  const handleRemovePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsApi.remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setFilteredPersons(persons.filter(p => p.id !== person.id))
      })
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
      <Persons persons={filteredPersons} removeItem={person => handleRemovePerson(person)} />
    </div>
  )
}

export default App