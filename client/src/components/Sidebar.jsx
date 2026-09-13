import hamburgerIcon from '../assets/hamburger-icon.png';

function Sidebar({ currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen }) {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'export', label: 'Export' }
  ];

  const handleNavClick = (key) => {
    setCurrentView(key);
    setIsSidebarOpen(false); // auto-close on mobile after picking a page
  };

  return (
    <>
      {/* Bar button — only visible on mobile via CSS */}
      <button
        className="hamburger-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <img src={hamburgerIcon} alt="Menu" />
      </button>

      <nav className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h2 className="sidebar-title">Expense Tracker</h2>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={currentView === item.key ? 'active' : ''}
                onClick={() => handleNavClick(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;