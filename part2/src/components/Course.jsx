const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

// Sumuje ćwiczenia ze wszystkich części - używając reduce
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Number of exercises {total}</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
