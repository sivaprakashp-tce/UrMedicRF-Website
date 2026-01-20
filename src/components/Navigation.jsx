import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const location = useLocation();
  
  // Don't show navigation on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>🏥 MediChat</h2>
      </div>
      <div className="nav-links">
        <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
          💬 Chat
        </Link>
        <Link to="/scheduling" className={location.pathname === '/scheduling' ? 'active' : ''}>
          📅 Schedule
        </Link>
        <Link to="/reminders" className={location.pathname === '/reminders' ? 'active' : ''}>
          ⏰ Reminders
        </Link>
        <Link to="/notifications" className={location.pathname === '/notifications' ? 'active' : ''}>
          🔔 Notifications
        </Link>
        <Link to="/login" className="logout-link">
          🚪 Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
