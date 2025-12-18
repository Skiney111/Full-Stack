import { useState } from 'react'
import CourseInfo from './part1/courseinfo/CourseInfo'
import Unicafe from './part1/unicafe/Unicafe'
import Anecdotes from './part1/anecdotes/Anecdotes'

const App = () => {
  const [currentPart, setCurrentPart] = useState('courseinfo')

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentPart('courseinfo')} style={{ marginRight: '10px' }}>
          CourseInfo (0.1-0.6)
        </button>
        <button onClick={() => setCurrentPart('unicafe')} style={{ marginRight: '10px' }}>
          Unicafe (1.6-1.11)
        </button>
        <button onClick={() => setCurrentPart('anecdotes')}>
          Anecdotes (1.12-1.14)
        </button>
      </nav>
      <hr />
      {currentPart === 'courseinfo' && <CourseInfo />}
      {currentPart === 'unicafe' && <Unicafe />}
      {currentPart === 'anecdotes' && <Anecdotes />}
    </div>
  )
}

export default App