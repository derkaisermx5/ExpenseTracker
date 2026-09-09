function TransactionList({ transactions, onDelete }) {
    if (transactions.length === 0) {
        // above line - early return for the empty state(handles "no data yet" case). Show a
        // helpful text instead of showing a blank list. 
      return <p>No transactions yet. Add one above to get started.</p>;
    }
  
    return (
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((t) => (
            // from (...) - loops over every transaction and turns each one into a list
            // item (<li>). standard React pattern for rendering a list from an array.

            // below line - React requires a unique key prop when rendering lists, to efficiently
            // track which items changed, added, or removed. used MongoDB's _id since its guaranteed unique.
            <li key={t._id}>
              <strong>{t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}</strong>
              {' — '}
              {t.category}
              {t.description && ` (${t.description})`}
              {/* above line - shows description text if exists, optional in the schema and defaults to empty string */}
              {' — '}
              {new Date(t.date).toLocaleDateString()}
              <button onClick={() => onDelete(t._id)} style={{ marginLeft: '10px' }}>
                {/* above line - similar to form component, calls a function from parent to delete selected transaction */}
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TransactionList;