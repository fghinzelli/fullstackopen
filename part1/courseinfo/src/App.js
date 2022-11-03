import './App.css';

const Header = props => {
  return <h1>{props.course.name}</h1>
}

const Content = props => {
  return (
    <>
      {props.parts.map((part, index) => <Part key={index} name={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = props => {
  return <p>Number of exercises {props.parts.reduce((total, part) => total += part.exercises, 0)}</p>
}

const Part = props => {
  return <p>{props.name} {props.exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

    return(
    
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  )
}

export default App;
