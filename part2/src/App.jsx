import Course from './components/Course'
import PhonebookApp from './components/PhonebookApp'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h2>Courses (Exercises 2.1-2.5)</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
          <hr />
        </div>
      ))}
      <h2>Phonebook (Exercises 2.6-2.10)</h2>
      <PhonebookApp />
    </div>
  )
}

export default App
