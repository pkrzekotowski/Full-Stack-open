const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
    {course.parts.map(part =>
        <Part key={part.id} exercises={part.exercises} name={part.name}/>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

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
      <h2>Web development curriculum</h2>
      {courses.map( course =>
        <Course course={course} key={course.id} />
      )}
    </div>
  )
}

export default App
