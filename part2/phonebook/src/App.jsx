import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [newPerson, setNewPerson] = useState({
    name: '',
    phone: ''
   })

  const handlePersonChange = (e) => {
    const { name, value } = e.target
    setNewPerson(
      {...newPerson,
      [name]: value
  })
  }

  const addNewNote = (e) => {
    e.preventDefault()

    const isInPhonebook = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (isInPhonebook === undefined) {
      setPersons(persons.concat(newPerson))
      setNewPerson({name: '', phone: ''})
      return
    }

    alert(`${newPerson.name} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.phone}</div>
      )}
    </div>
  )
}

export default App
