import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNoteChange = (e) => setNewName(e.target.value)

  const addNewNote = (e) => {
    e.preventDefault()

    const isInPhonebook = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (isInPhonebook === undefined) {
      const noteObject = {
        name: newName,
      }

      setPersons(persons.concat(noteObject))
      setNewName('')
      return
    }

    alert(`${newName} is already added to phonebook`)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNote}>
        <div>
          name: <input
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App
