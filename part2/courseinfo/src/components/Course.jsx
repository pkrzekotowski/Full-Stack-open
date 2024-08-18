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

export default Course
