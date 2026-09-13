function Sidebar({ currentView, setCurrentView }) {
    const navItems = [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'transactions', label: 'Transactions' },
      { key: 'export', label: 'Export' }
    ];
  
    return (
      <nav className="sidebar">
        <h2 className="sidebar-title">Expense Tracker</h2>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={currentView === item.key ? 'active' : ''}
                onClick={() => setCurrentView(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  
  export default Sidebar;