import { useState } from 'react';


function TransactionList({ transactions, onDelete }) {
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Build a unique list of categories from the actual transactions
    // line below .map() - extracts the category from every transaction, and wraps it in 'new Set(...)' auto
    // removing dupes.
    // 'Set' only stores unique values. Speading with '...' converts back into plain array.
    // ['All', ...new Set(...)] - prepends 'All' to array, so dropdown has option to clear filter and see everything.
    const categories = ['All', ...new Set(transactions.map((t) => t.category))];
  
    // Filter the transactions based on the selected category
    // categoryFilter state - tracks which options is currently selected in dropdown. initiates 'All' as default.
    // filteredTranscations - is filtering logic: if 'All' is selected, show everything;else, only show transactions
    //      matching selected category. Computed fresh every render, not in its own useState, since its derived from transactions/categoryFilter
    const filteredTransactions = categoryFilter === 'All'
      ? transactions
      : transactions.filter((t) => t.category === categoryFilter);
  
    return (
      <div>
        <div className="list-header">
          <h2>Transactions</h2>
          <label>
            Filter by category:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>
  
        {filteredTransactions.length === 0 ? (
            // changed empty check from 'transaction.length === 0' so if a filtered with a category with zero
            // matches, you see a message letting you know no transactions match.
          <p>No transactions match this filter.</p>
        ) : (
          <ul>
            {filteredTransactions.map((t) => (
              <li key={t._id}>
                <strong style={{ color: t.type === 'income' ? '#27ae60' : '#e74c3c' }}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </strong>
                {' — '}
                {t.category}
                {t.description && ` (${t.description})`}
                {' — '}
                {new Date(t.date).toLocaleDateString()}
                <button onClick={() => onDelete(t._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default TransactionList;