import { useState } from 'react'

const Persons = ({ person }) => <div>{person.name} {person.phone}</div>

const PersonForm = ({ onSubmit, onChange, nameText, phoneText, newPerson }) => {
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
          name={phoneText}
          value={newPerson.phone}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({
    name: '',
    phone: ''
   })
  const [searchTerm, setSearchTerm] = useState('')

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
        phone: newPerson.phone,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject))
      setNewPerson({name: '', phone: ''})
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
        phoneText='phone'
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
