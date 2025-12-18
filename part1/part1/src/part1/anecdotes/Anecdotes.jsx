import { useState } from 'react'

// Przycisk do obsługi akcji
const AnecdoteButton = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdotes = () => {
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
   
  // Stan: obecnie wyświetlana anegdota
  const [selected, setSelected] = useState(0)
  // Stan: liczba głosów dla każdej anegdoty
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Wybierz losową anegdotę
  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  // Dodaj głos do obecnej anegdoty
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  // Znajdź anegdotę z największą liczbą głosów
  let maxVotes = 0
  let maxIndex = 0
  
  for (let i = 0; i < votes.length; i = i + 1) {
    if (votes[i] > maxVotes) {
      maxVotes = votes[i]
      maxIndex = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <AnecdoteButton onClick={handleVote} text="vote" />
      <AnecdoteButton onClick={handleNext} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default Anecdotes
