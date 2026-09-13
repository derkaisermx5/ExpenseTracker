import './App.css';
import Sidebar from './components/Sidebar';
import ExportData from './components/ExportData';
import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import CategoryChart from './components/CategoryChart';
import MonthlyChart from './components/MonthlyChart';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // fetchSummary as its own function - this keeps cards in sync always, since it's called
  // whenever data might have changed: on initial load, after adding/deleting transaction
  const fetchSummary = () => {
    fetch('http://localhost:5000/api/transactions/summary')
    .then((res) => res.json())
    .then((data) => setSummary(data))
    .catch((err) => console.error('Failed to fetch summary:', err));
  };

  const fetchTransactions = () => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:5000/api/transactions')
      .then((res) => {
        if (!res.ok) throw new Error('Server responded with an error');
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch transactions:', err);
        setError('Could not load transactions. Is the server running?');
        setLoading(false);
      });
  };

  const fetchAll = () => {
    fetchTransactions();
    fetchSummary();
  };

  // Fetch all transactions(from API) when the app first loads
  useEffect(() => {
    fetchAll();
  }, []);
  // above line - [] mean only run this once, nt every time something re-renders.

  // function below - after adding transaction, it adds it to the front of existing list
  // w/o  need to re-fetch everything from the server. Fast & Effiecient.
  const handleTransactionAdded = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);

    // every time the transaction list changes, we also refresh the summary numbers, so we prevent
    // "Total Expenses" card from still displaying the old number until manually refreshing the page.
    fetchSummary();
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
      fetchSummary();
    } catch (err) {
      console.error(err);
      alert('Something went wrong deleting the transaction.'); 
    }
  };

  return (
    <div className="app-layout">
      <Sidebar 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="App">
        <h1>Expense Tracker</h1>

        {error ? (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={fetchAll}>Try Again</button>
          </div>
        ) : (
          <>
            {currentView === 'dashboard' && (
              <>
                <SummaryCards summary={summary} />

                {/* '?.' - is known as optional chaining. Summary starts as null before data loads, trying to access
                  summary.categoryTotals directly would throw an error. '?.' says "if summary is null, return undefined
                  instead of crashing" which CategoryChart handles. */}
                <CategoryChart categoryTotals={summary?.categoryTotals} />
                <MonthlyChart monthlyBreakdown={summary?.monthlyBreakdown} />
              </>
            )}
            
            {currentView === 'transactions' && (
              <>
                <TransactionForm onTransactionAdded={handleTransactionAdded} />
                {loading ? (
                  <p className="loading-text">Loading transactions...</p> 
                ) : (
                  <TransactionList transactions={transactions} onDelete={handleDelete} />
                )}
              </>
            )}

            {currentView === 'export' && (
              <ExportData transactions={transactions} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;