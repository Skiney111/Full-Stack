// Komponent nagłówka
const Header = ({ name }) => <h1>{name}</h1>

// Wyświetla wszystkie części kursu
const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

// Komponent pojedynczej części
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

// Sumuje ćwiczenia ze wszystkich części
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

const CourseInfo = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default CourseInfo
