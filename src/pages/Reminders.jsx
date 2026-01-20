import { useState } from 'react';
import '../styles/Reminders.css';

function Reminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'medicine',
      title: 'Take Blood Pressure Medication',
      time: '08:00 AM',
      date: '2026-01-21',
      completed: false
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Checkup with Dr. Sarah Johnson',
      time: '10:00 AM',
      date: '2026-01-22',
      completed: false
    },
    {
      id: 3,
      type: 'medicine',
      title: 'Take Vitamin D Supplement',
      time: '12:00 PM',
      date: '2026-01-21',
      completed: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'medicine',
    title: '',
    time: '',
    date: ''
  });

  const toggleComplete = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: Date.now(),
      ...newReminder,
      completed: false
    };
    setReminders([...reminders, reminder]);
    setNewReminder({ type: 'medicine', title: '', time: '', date: '' });
    setShowAddForm(false);
  };

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <h1>Reminders</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-reminder-btn">
          {showAddForm ? 'Cancel' : '+ Add Reminder'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddReminder} className="add-reminder-form">
          <div className="form-row">
            <select
              value={newReminder.type}
              onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
              required
            >
              <option value="medicine">Medicine</option>
              <option value="appointment">Appointment</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              required
            />
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-reminder-btn">Add Reminder</button>
        </form>
      )}

      <div className="reminders-list">
        {reminders.length === 0 ? (
          <p className="no-reminders">No reminders yet. Add one to get started!</p>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} className={`reminder-card ${reminder.completed ? 'completed' : ''}`}>
              <div className="reminder-type">
                <span className={`type-badge ${reminder.type}`}>
                  {reminder.type === 'medicine' ? '💊' : '📅'}
                </span>
              </div>
              <div className="reminder-details">
                <h3>{reminder.title}</h3>
                <p className="reminder-datetime">
                  {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
                </p>
              </div>
              <div className="reminder-actions">
                <button
                  onClick={() => toggleComplete(reminder.id)}
                  className="complete-btn"
                >
                  {reminder.completed ? '↩️ Undo' : '✓ Done'}
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reminders;
