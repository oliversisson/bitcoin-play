import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newT) => {
    setTransactions((prevTs) => {
      const newTs = [...prevTs];
      newT.key = newTs.length;
      newTs.push(newT);
      return newTs;
    });
  };

  return (
    <ThemeContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };

