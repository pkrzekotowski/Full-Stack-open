import { useState } from 'react'

const StatisticLine = ({ text, value, unit }) => {
  return (
    <div>
    {text} {value} {unit}
  </div>
  )
}

const Statistics = ({ good, bad, neutral, positive, average, total }) => {
  if (total === 0) {
    return (
      <div>
        No Feedback Given
      </div>
    )
  }
  return (
  <>
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text='average' value={average} />
    <StatisticLine text='positve' value={positive} unit='%' />
  </>
 )
}


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = bad + good + neutral
  const average = total === 0 ? 0 : ((good - bad) / (total)).toFixed(2)
  const positive = total === 0 ? 0 : ((good / total) * 100).toFixed(2)

  const handleGoodClick = () => setGood(prevGood => prevGood + 1)
  const handleNeutralClick = () => setNeutral(prevNetural => prevNetural + 1)
  const handleBadClick = () => setBad(prevBad => prevBad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h2>statistics</h2>
      <Statistics
      good={good}
      bad={bad}
      neutral={neutral}
      average={average}
      positive={positive}
      total={total}
      />
    </div>
  )
}

export default App
