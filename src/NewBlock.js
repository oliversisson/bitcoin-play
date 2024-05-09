import React, { useContext } from 'react';
import { useTheme } from './MyContext';
import Transaction from './Transaction.js';

const NewBlock = () => {
  const { transactions, addTransaction } = useTheme();

  return (
    <div className="newblock">
      <p>Your proposed new block</p>
      {transactions.filter(t => (!!t.selected && true)).map(t => (
        <Transaction t={t} key={t.key} />
      ))}
      <p> Nonce: <input type="number" /> </p>
      <button type="button">Calculate SHA256</button>
    </div>
  );
}

export default NewBlock;
