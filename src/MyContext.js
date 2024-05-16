import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const hackBlocks = [
    {hash: "77f3", noTransactions: 3, profit: 6},
    {hash: "72f3", noTransactions: 2, profit: 7},
    {hash: "79e3", noTransactions: 3, profit: 8},
  ];
  const [blocks, setBlocks] = useState([]);
  const [key, setKey] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const addBlock = (hash, nonce) => {
    const selectedTs = transactions.filter(t => (!!t.selected));
    const profit = selectedTs.reduce((acc, t) => (acc + t.fee), 0);

    setBalance((prevBalance) => {
      return prevBalance + profit;
    });
    setBlocks((prevBs) => {
      const newBs = [...prevBs];
      const newB = {
        hash,
        nonce,
        noTransactions: selectedTs.length,
        profit,
      };
      newBs.push(newB);
      return newBs;
    });
    setTransactions((prevTs) => {
      return transactions.filter(t => (!t.selected));
    })
  };

  const addTransaction = (newT) => {
    let nextKey;
    setKey((prevKey) => {
      nextKey = prevKey + 1;
      return nextKey;
    });
    setTransactions((prevTs) => {
      const newTs = [...prevTs];
      newT.key = nextKey;
      newTs.push(newT);
      return newTs;
    });
  };

  const getLastHash = () => {
    const lastTransaction = transactions[transactions.length - 1];
    return lastTransaction.hash;
  }

  return (
    <ThemeContext.Provider value={{ balance, blocks, transactions, addBlock, addTransaction }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };

