// Summary Cards are basicaaly boxes categorized for: Total Balance, Monthly Income, Monthly Expenses, Savings Rate, etc.

function SummaryCards({ summary }) {
    // line below - before data has loaded from API, summary will be null || undefined. Returning null tells
    // React to render nothing instead of crashing when trying to read summary.balance on something non-existant.
    if (!summary) return null;
  
    // array below - defines data once as an array and loop over it rather than manually writing 4 similar blocks.
    const cards = [
      { label: 'Total Balance', value: summary.balance, color: '#2c3e50' },
      { label: 'Total Income', value: summary.totalIncome, color: '#27ae60' },
      { label: 'Total Expenses', value: summary.totalExpenses, color: '#e74c3c' },
      { label: 'Savings Rate', value: `${summary.savingsRate}%`, isPercent: true, color: '#8e44ad' }
    ];
  
    return (
      <div className="summary-cards">
        {cards.map((card) => (
            // key={card.label} — same reasoning as transactions: React needs unique key when rendering a list.
          <div key={card.label} className="card">
            <p className="card-label">{card.label}</p>
            <p className="card-value" style={{ color: card.color }}>
                {/* line bellow - saving rate card already has a % built into its value, and isnt dollar anount
                    so we skip the $ and .toFixed(2) formatting for just that card. */}
              {card.isPercent ? card.value : `$${card.value.toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default SummaryCards;