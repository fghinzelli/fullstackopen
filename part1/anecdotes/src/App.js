import React, { useState } from 'react';
import './App.css';

function App() {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([])
  const [mostVotes, setMostVotes] = useState({totalVotes: '', text: ''})
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const handleAddVote = () => {
    const newPoints = [...points];
    if (newPoints[selected]) {
      newPoints[selected] += 1 
    } else {
      newPoints[selected] = 1
    }
    setPoints(newPoints);
    let maxValue = Math.max(...newPoints)
    let idMaxValue = newPoints.forEach((i,index) => i === maxValue ? index : null)
    setMostVotes({totalVotes: maxValue, text: anecdotes[idMaxValue[0]]})
    console.log(newPoints)
  }



  return (
    <div className="App">
      <h2>Anecdote of the day</h2>
      <p className="anecdote">{anecdotes[selected]} <br/>has {points[selected] ? points[selected] : 0} votes</p>
      <button onClick={handleAddVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p className="anecdote">{mostVotes.text} <br/>has {mostVotes.totalVotes} votes</p>
    </div>
  );
}

export default App;
