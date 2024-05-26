const Header = ({title}) => <h2>{title}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) =>{
  return(
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum+part.exercises,0)
  return(
    <p>Total of {total} exercises</p>
  )
}

const Course = ({course}) =>{
  return(
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course