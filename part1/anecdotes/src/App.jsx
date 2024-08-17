import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(anecdote => 0))
  const [maxVotes, setMaxVotes] = useState(0)

  console.log(votes)

  const handleNextAnecdote = () => {
    let nextIndex
    do {
      nextIndex = Math.floor(Math.random() * anecdotes.length)
    } while (nextIndex === selected)
    setSelected(nextIndex)
   }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    if (newVotes[selected] > votes[maxVotes]) {
      setMaxVotes(selected)
    }

    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleNextAnecdote}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxVotes]}</div>
      <div>has {votes[maxVotes]} votes</div>
    </div>
  )
}

export default App
