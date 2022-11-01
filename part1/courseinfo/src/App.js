import './App.css';

const Header = props => {
  return <h1>{ props.name }</h1>
}

const Content = props => {
  return(
      <>
          { props.exercises.map((exercise, index) => <Part key={ index } title={exercise.title} qtd={exercise.qtd} />)}
      </>
  )
}

const Total = props => {
  return <p>Number of exercises {props.qtdExercises}</p>
}

const Part = props => {
  return <p>{ props.title} {props.qtd}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises = [
    {title: 'Fundamentals of React', qtd: 10},
    {title: 'Using props to pass data', qtd: 7},
    {title: 'State of a component', qtd: 14}
  ];

  return (
    
    <div>
      <Header name={ course }/>
      <Content exercises={ exercises } />
      <Total qtdExercises={ exercises.reduce((total, item) => total += item.qtd, 0) } />
    </div>
  )
}

export default App;
