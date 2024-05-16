import React, { useContext, useState } from 'react';
import { useTheme } from './MyContext';

const Blocks = () => {
  const { blocks } = useTheme();
//  const [nonce, setNonce] = useState(0);

  const shorten = (str, l) => (str.slice(0, l) + '...' + str.slice(-1*l));

  console.log(blocks);
  return (
    <div className="blocks">
      <p>The Blockchain:</p>
      <div className="blocks">
        {blocks.map(block => (
          <div className="block">
            <p style={{margin: 5}}>Hash: {shorten(block.hash, 5)}</p>
            <p style={{margin: 5}}># of transactions: {block.noTransactions}</p>
            <p style={{margin: 5}}>Profit: {block.profit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blocks;
