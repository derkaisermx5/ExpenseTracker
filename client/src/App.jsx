import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions(from API) when the app first loads
  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        // above line - stores array in state, which trigger React to re-render and show list.
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch transactions:', err);
        setLoading(false);
      });
  }, []);
  // above line - [] mean only run this once, nt every time something re-renders.

  // function below - after adding transaction, it adds it to the front of existing list
  // w/o  need to re-fetch everything from the server. Fast & Effiecient.
  const handleTransactionAdded = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  // function below - calls 'DELETE' API route, then removes transaction from local state
  // using .filter(). which keeps all except the one matching the deleted id.
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');

      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert('Something went wrong deleting the transaction.');
    }
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      {loading ? <p>Loading...</p> : (
        // above line - while initial fetch happens, it swaps to actual list once data arrives.
        // prevents a startling message before real data loads in.
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;