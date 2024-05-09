import React, { useContext, useState } from 'react';
import { useTheme } from './MyContext';
import Transaction from './Transaction.js';

const NewBlock = () => {
  const { transactions, addTransaction } = useTheme();
  const [nonce, setNonce] = useState(0);

  const onNonceChange = (e) => {
    setNonce(e.target.value);
  };

  return (
    <div className="newblock">
      <p>Your proposed new block</p>
      {transactions.filter(t => (!!t.selected && true)).map(t => (
        <Transaction t={t} key={t.key} />
      ))}
      <p> Nonce: <input type="number" value={nonce} onChange={onNonceChange} /> </p>
      <button type="button">Calculate SHA256</button>
    </div>
  );
}

export default NewBlock;
