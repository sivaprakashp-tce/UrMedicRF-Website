import { useState } from 'react';
import '../styles/Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'confirmed',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Sarah Johnson on Jan 22, 2026 at 10:00 AM has been confirmed.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'pending',
      title: 'Appointment Pending',
      message: 'Your appointment request with Dr. Michael Chen is pending approval.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Medicine Reminder',
      message: 'Don\'t forget to take your blood pressure medication at 8:00 PM today.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'cancelled',
      title: 'Appointment Cancelled',
      message: 'Your appointment with Dr. Emily Davis on Jan 20, 2026 has been cancelled.',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'rescheduled',
      title: 'Appointment Rescheduled',
      message: 'Your appointment has been rescheduled to Jan 25, 2026 at 3:00 PM.',
      time: '3 days ago',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconForType = (type) => {
    switch(type) {
      case 'confirmed': return '✅';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      case 'rescheduled': return '🔄';
      case 'reminder': return '🔔';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p className="unread-count">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="mark-all-btn">
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} className="clear-all-btn">
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <p>📭 No notifications</p>
            <span>You're all caught up!</span>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {getIconForType(notification.type)}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="delete-notification-btn"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
