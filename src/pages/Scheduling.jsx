import { useState } from 'react';
import '../styles/Scheduling.css';

function Scheduling() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Physician' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrician' },
    { id: 5, name: 'Dr. Lisa Brown', specialty: 'Neurologist' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Appointment scheduled:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason
    });
    
    alert('Appointment scheduled successfully!');
    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
  };

  return (
    <div className="scheduling-container">
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSchedule} className="scheduling-form">
        <div className="form-section">
          <h3>Select Doctor</h3>
          <div className="doctor-selection">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`doctor-card ${selectedDoctor === doctor.name ? 'selected' : ''}`}
                onClick={() => setSelectedDoctor(doctor.name)}
              >
                <h4>{doctor.name}</h4>
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="date-input"
            required
          />
        </div>

        <div className="form-section">
          <h3>Select Time</h3>
          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Reason for Visit (Optional)</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your symptoms or reason for visit..."
            className="reason-input"
            rows="4"
          />
        </div>

        <button type="submit" className="schedule-button">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default Scheduling;
