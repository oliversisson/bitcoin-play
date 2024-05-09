import React, { useContext, useEffect } from 'react';
import { useTheme } from './MyContext';
import Transaction from './Transaction.js';

function gaussianRandom(mean=6, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

const Transactions = () => {
  const { transactions, addTransaction } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
    console.log("Oliver")
      addTransaction({fee: gaussianRandom()});
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transactions">
      <p>Available uncommitted transactions:</p>
      {transactions.map(t => (
        <Transaction t={t} key={t.key} />
      ))}
    </div>
  );
}

export default Transactions;
