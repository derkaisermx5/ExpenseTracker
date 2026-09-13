import { useState } from 'react';


function TransactionList({ transactions, onDelete }) {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
    const filteredTransactions = transactions.filter((t) => {
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;

      const transactionDate = new Date(t.date);
    //   afterStart/beforeEnd - set the date range to see selected transaction in that time frame
      const afterStart = startDate ? transactionDate >= new Date(startDate) : true;
    // endDate + 'T23:59:59' - edge case for date inputs like '2026-09-15' that gets interpreted as midnight at start of day. Appending the
    // end-of-day time ensures the whole day is included.
      const beforeEnd = endDate ? transactionDate <= new Date(endDate + 'T23:59:59') : true;

      // all three conditions must be true for transaction to show up. combines filters category and date. (Ex: "Food expenses in the last week")
      return matchesCategory && afterStart && beforeEnd;
    });

    // resets all three filter to default, giving users ease of overviewing w/o manually clearing seperate filters.
    const clearFilters = () => {
      setCategoryFilter('All');
      setStartDate('');
      setEndDate('');
    };
    
  
    return (
      <div>
        <div className="list-header">
          <h2>Transactions</h2>
        </div>

        <div className="filters">
          <label>
            Category:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

              {/* startDate/endDate state - these start as empty strings meaning no filter applied, but '<input type="date">'
                gives users a native date picker.  */}
          <label>
            From:
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label>
            To:
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            </label>

            <button type="button" onClick={clearFilters}>Clear Filters</button>
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