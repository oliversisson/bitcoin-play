import { useState, useEffect } from 'react';
import './App.css';
import Transaction from './Transaction.js';

function gaussianRandom(mean=6, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prevTs) => {
        const newTs = [...prevTs];
        newTs.push({key: newTs.length, fee: gaussianRandom()});
        return newTs;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h2>
          Bitcoin Play!
        </h2>
      </div>
      <div className="transactions">
        <p>Available uncommitted transactions:</p>
        {transactions.map(t => (
          <Transaction t={t} key={t.key} />
        ))}
      </div>
      <div className="newblock">
        <p>Your proposed new block</p>
        {transactions.filter(t => (!!t.selected && true)).map(t => (
          <Transaction t={t} key={t.key} />
        ))}
        <p> Nonce: <input type="number" /> </p>
        <button type="button">Calculate SHA256</button>
      </div>
    </div>
  );
}

export default App;
