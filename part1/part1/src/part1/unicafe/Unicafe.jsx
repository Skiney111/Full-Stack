import { useState } from 'react'

// Przycisk do klikania
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// Wyświetla jeden wiersz statystyki
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// Oblicza i wyświetla statystyki opinii
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  
  // Jeśli brak opinii, wyświetl komunikat
  if (total === 0) {
    return <p>No feedback given</p>
  }

  // Oblicz średnią i procent pozytywnych
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(2) + '%'} />
      </tbody>
    </table>
  )
}

const Unicafe = () => {
  // Stany dla każdego typu opinii
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default Unicafe
