import React, { useEffect } from 'react';

const generateColor = () => {
  return (
    '#' +
    // number between 0 and 1
    (
      (Math.random() *
        // hexadecimal
        0xffffff) <<
      // shift operator eliminates everything after '.' 0234.xxxx
      0
    ).toString(
      // base 16
      16
    )
  );
};

// it will only render only when props are changed
const CounterView = (props) => {
  const { countValue, handleIncrement } = props;

  useEffect(() => {
    console.log('Use Effect on CounterView');
  });

  return (
    <div style={{ background: generateColor(), color: '#ffffff' }}>
      <h1 className="value">{countValue}</h1>
      <button onClick={handleIncrement(1)}>Increment</button>
      <button onClick={handleIncrement(-1)}>Decrement</button>
    </div>
  );
};

export default React.memo(CounterView);
