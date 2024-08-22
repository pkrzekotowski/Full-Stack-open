import { useEffect, useState } from 'react'
import phonebookService from './services/notes'

const Persons = ({ person, handleDeletion }) => {
  return (
    <div>
      {person.name} {person.number} {''}
       <button onClick={handleDeletion}>delete</button>
    </div>
  )
}

const PersonForm = ({ onSubmit, onChange, nameText, numberText, newPerson }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          name={nameText}
          value={newPerson.name}
          onChange={onChange}
        />
      </div>
      <div>
        number: <input
          name={numberText}
          value={newPerson.number}
          onChange={onChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
   })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(personList => setPersons(personList))
  }, [])

  const handlePersonChange = (e) => {
    const { name, value } = e.target
    setNewPerson(
      {...newPerson,
      [name]: value
  })
  }

  const handleDeletion = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    let result = window.confirm(`Delete ${personToDelete.name} ?`)

    if (result) {
      phonebookService
        .deletePerson(id)
        .then(returnedPerson => setPersons(persons.filter(person => returnedPerson.id !== person.id)))
    }
  }

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const addNewPerson = (e) => {
    e.preventDefault()

    const isInPhonebook = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    }

    if (isInPhonebook === undefined) {

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPerson({name: '', number: ''})
        })

      return
    }

    let result = window.confirm
    (`${newPerson.name} is already added to phonebook, replace the old number with new one?`)

    if (result) {
      phonebookService
        .update(isInPhonebook.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewPerson({name: '', number: ''})
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <h2>Add a new number</h2>
      <PersonForm
        onSubmit={addNewPerson}
        onChange={handlePersonChange}
        nameText='name'
        numberText='number'
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <Persons
          person={person}
          key={person.id}
          handleDeletion={() => handleDeletion(person.id)}
        />
      )}
    </div>
  )
}

export default App
