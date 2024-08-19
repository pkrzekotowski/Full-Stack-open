import { useState } from 'react'

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

  const addNewNote = (e) => {
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
      <div>filter shown with
        <input
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h2>Add a new number</h2>
      <form onSubmit={addNewNote}>
        <div>
          name: <input
            name='name'
            value={newPerson.name}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number: <input
            name='phone'
            value={newPerson.phone}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <div key={person.name}>{person.name} {person.phone}</div>
      )}
    </div>
  )
}

export default App
