import './App.css';
import { ThemeProvider } from './MyContext';
import NewBlock from './NewBlock.js';
import Transactions from './Transactions.js';

function gaussianRandom(mean=6, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

const setTransactions = (fn) => {return 0;};
const App = () => {
  const sharedValue = {
      transactions: []
    };

  return (
    <ThemeProvider>
      <div className="App">
        <div className="header">
          <h2>
            Bitcoin Play!
          </h2>
        </div>
        <Transactions />
        <NewBlock />
      </div>
    </ThemeProvider>
  );
}

export default App;
