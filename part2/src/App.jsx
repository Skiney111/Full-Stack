import { useState } from 'react'
import Course from './components/Course'
import PhonebookApp from './components/PhonebookApp'
import CountriesApp from './components/CountriesApp'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ]
    }
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'courses':
        return (
          <div>
            <h2>Courses (Exercises 2.1-2.5)</h2>
            {courses.map((course) => (
              <div key={course.id}>
                <Course course={course} />
              </div>
            ))}
          </div>
        )
      case 'phonebook':
        return (
          <div>
            <h2>Phonebook (Exercises 2.6-2.17)</h2>
            <PhonebookApp />
          </div>
        )
      case 'countries':
        return (
          <div>
            <h2>Countries (Exercises 2.18-2.20)</h2>
            <CountriesApp />
          </div>
        )
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Full Stack Open - Part 2</h1>
            <p>Exercises 2.1 - 2.20</p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentPage('courses')}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                Courses (2.1-2.5)
              </button>
              <button
                onClick={() => setCurrentPage('phonebook')}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                Phonebook (2.6-2.17)
              </button>
              <button
                onClick={() => setCurrentPage('countries')}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                Countries (2.18-2.20)
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      <nav style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('courses')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            Courses
          </button>
          <button
            onClick={() => setCurrentPage('phonebook')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            Phonebook
          </button>
          <button
            onClick={() => setCurrentPage('countries')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            Countries
          </button>
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        {renderPage()}
      </main>
    </div>
  )
}

export default App