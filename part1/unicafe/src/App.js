import React, { useState } from 'react';
import './App.css';

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  let stat = 'No feedback given';
  if (all > 0) {
    stat = (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={all} />
          <StatisticLine text={'average'} value={average} />
          <StatisticLine text={'positive'} value={`${positive} %`} />
        </tbody>
      </table>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      {stat}
    </>
  );
}

const Button = ({ onClick, title }) => <button onClick={onClick}>{title}</button>;

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>;


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleCalc = (type) => {
    let newGood = good;
    let newNeutral = neutral;
    let newBad = bad;
    let newAll = all + 1;

    switch (type) {
      case 'good':
        newGood += 1;
        setGood(newGood);
        break;
      case 'neutral':
        newNeutral += 1;
        setNeutral(newNeutral);
        break;
      case 'bad':
        newBad += 1;
        setBad(newBad);
        break;
      default:
        break;
    }
    setAverage(((newGood * 1) + (newBad * -1)) / newAll);
    setPositive(newGood / newAll * 100)
    setAll(newAll);
  }

  return (
    <div className="App">
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => handleCalc('good')} title={'good'} />
        <Button onClick={() => handleCalc('neutral')} title={'neutral'} />
        <Button onClick={() => handleCalc('bad')} title={'bad'} />
      </div>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />

    </div>
  );
}

export default App;
