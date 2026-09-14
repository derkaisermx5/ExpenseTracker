import { useState } from 'react';
// 'useState' - this is React's way pf tracking values that change over time (what the user
// has typed), and re-renders UI when they change. Each field gets its own piece of state.

function TransactionForm({ onTransactionAdded }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      description
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`, {
        // above line - this is the actual network call to my Express backend.
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const savedTransaction = await response.json();
      onTransactionAdded(savedTransaction);
      // above line - function inherited from parent component (App.jsx). Child tells parent that
      // a new transaction was added, so parent can update the displayed list w/o needing to re-fetch everything.

      // Reset the form
      // So it's ready for next entry
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong adding the transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          // the line above updates the state with the current input value, every
          // time the user types.

          required
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;