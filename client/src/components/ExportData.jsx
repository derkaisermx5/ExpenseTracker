function ExportData({ transactions }) {
    const handleExport = () => {
      if (transactions.length === 0) {
        alert('No transactions to export yet.');
        return;
      }
  
      // Build the CSV header row
      const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  
      // Build one row per transaction
      const rows = transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        t.amount.toFixed(2),
        t.description || ''
      ]);
  
      // Combine header + rows into CSV text
      const csvContent = [headers, ...rows]
        .map((row) => row.map((value) => `"${value}"`).join(','))
        .join('\n');
  
      // Create a downloadable file from the CSV text
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
  
      URL.revokeObjectURL(url);
    };
  
    return (
      <div className="export-section">
        <h2>Export Your Data</h2>
        <p>Download all your transactions as a CSV file, compatible with Excel, Google Sheets, and Numbers.</p>
        <p>You currently have {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} saved.</p>
        <button onClick={handleExport}>Download CSV</button>
      </div>
    );
  }
  
  export default ExportData;