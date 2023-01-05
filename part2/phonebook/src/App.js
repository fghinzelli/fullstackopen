import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Notification from './components/Notifications';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsApi from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(()=> {
    personsApi.getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const handleShowMessage = (msg, type) => {
    const TIMEOUT_MESSAGE = 5 * 1000;

    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, TIMEOUT_MESSAGE);
  }

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
          let newList = persons.filter(person => person.name !== newPerson.name)
          personsApi.update(filtredList[0].id, newPerson)
          .then(updatedPerson => {
            newList = newList.concat(updatedPerson.data)
            updateLists(newList)
            handleShowMessage(`Updated ${newPerson.name}`, 'success')
          }).catch(error => {
            if (error.response.status === 404) {
              updateLists(newList)
              handleShowMessage(`Information of ${newPerson.name} has already been removed from server`, 'error')
            } else {
              handleShowMessage(error.message, 'error')
            }
          })
        }
      } else {
        personsApi.create(newPerson)
        .then(response => {
          const newPersons = persons.concat(response.data)
          updateLists(newPersons)
          handleShowMessage(`Added ${newPerson.name}`, 'success')
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
      }).catch(error => {
        console.log(error)
        if (error.response.status === 404) {
          handleShowMessage(`Information of ${person.name} has already been removed from server`, 'error')
        } else {
          handleShowMessage(error.message, 'error')
        }
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
      <Notification message={message} type={messageType} />
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