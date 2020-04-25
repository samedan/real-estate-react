import React, { useState, useEffect, useCallback } from 'react';
import './CounterUp.css';
import CounterView from './CounterView';

// set is object that keeps only unique data
const functions = new Set();

const CounterUp = () => {
  const [count, setCount] = useState(0);
  const [whatever, setWhatever] = useState(10);

  useEffect(() => {
    console.log('Use Effect');
  }, []);

  //   const increment = (step) => () => setCount(count + step);

  //   const doWhatever = () => setWhatever(whatever + 1);
  const increment = useCallback((step) => () => setCount(count + step), [
    count,
  ]);
  const doWhatever = useCallback(() => setWhatever(whatever + 1), [whatever]);
  //   debugger;
  functions.add(increment);
  functions.add(doWhatever);

  return (
    <div>
      <div className="counter-app">
        <CounterView countValue={count} handleIncrement={increment} />
        <button onClick={doWhatever}> Do Whatever</button>
        <h1>Functions: {functions.size}</h1>
      </div>
    </div>
  );
};

export default CounterUp;
