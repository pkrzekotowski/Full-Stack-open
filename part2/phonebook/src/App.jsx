import { useEffect, useState } from 'react'
import axios from 'axios'

const Persons = ({ person }) => <div>{person.name} {person.number}</div>

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
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handlePersonChange = (e) => {
    const { name, value } = e.target
    setNewPerson(
      {...newPerson,
      [name]: value
  })
  }

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const addNewPerson = (e) => {
    e.preventDefault()

    const isInPhonebook = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (isInPhonebook === undefined) {

      const personObject = {
        name: newPerson.name,
        number: newPerson.number,
      }

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewPerson({name: '', number: ''})
        })

      return
    }

    alert(`${newPerson.name} is already added to phonebook`)
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
        <Persons person={person} key={person.id}/>
      )}
    </div>
  )
}

export default App
