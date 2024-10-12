import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import SummaryModal from './SummaryModal';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: '',
    uphone: '',
    uemail: '',
    departureDate: null,
    departureTime: '10:00',
    returnDate: null,
    returnTime: '10:00',
    from: '',
    to: '',
    type: 'one-way',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update to handle date formatting (use string formatting if rendering)
  const handleDateChange = (date) => {
    setFormData({ ...formData, departureDate: date });
  };

  const handleReturnDateChange = (date) => {
    setFormData({ ...formData, returnDate: date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, departureTime: time });
  };

  const handleReturnTimeChange = (time) => {
    setFormData({ ...formData, returnTime: time });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmBooking = async () => {
    const response = await fetch('http://localhost:5002/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (response.ok) {
      navigate('/confirmation');
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div className="w-full">
      <Link to="/" className="bookingform-logo-wrapper">
        <h1 className="MainLogo text-center">Turbo<span>Taxi</span></h1>
      </Link>
      <h2 className="Page-Title mt-8">Booking</h2>
      <form onSubmit={handleSubmit} className="w-full mb-6">
        <div className="form-group">
          <label className="form-lbl">Name</label>
          <input
            className="form-input"
            type="text"
            name="uname"
            maxLength="50"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-lbl">Email</label>
          <input
            className="form-input"
            type="email"
            name="uemail"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-lbl">Phone Number</label>
            <input
              className="form-input"
              type="tel"
              name="uphone"
              maxLength="12"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Type</label>
            <div className="input-extend-group">
              <select className="form-input" name="type" onChange={handleChange} required>
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
              </select>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-lbl">Departure Date</label>
            <div className="input-extend-group">
              <DatePicker
                selected={formData.departureDate}
                onChange={handleDateChange}
                className="form-input cursor-pointer"
                placeholderText="MM/DD/YYYY"
                required
              />
              <span className="material-symbols-outlined" onClick={() => document.querySelector('.react-datepicker-wrapper input').focus()}>
                calendar_month
              </span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-lbl">Departure Time</label>
            <div className="input-extend-group">
              <TimePicker
                onChange={handleTimeChange}
                value={formData.departureTime}
                className="form-input cursor-pointer"
                clockClassName="custom-clock"
                disableClock
                required
              />
              <span
                className="material-symbols-outlined"
                onClick={() => document.querySelector('.react-time-picker__inputGroup input').focus()}
              >
                calendar_clock
              </span>
            </div>
          </div>
        </div>
        {formData.type === 'round-trip' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-lbl">Return Date</label>
              <div className="input-extend-group">
                <DatePicker
                  selected={formData.returnDate}
                  onChange={handleReturnDateChange}
                  className="form-input cursor-pointer"
                  placeholderText="MM/DD/YYYY"
                  required
                />
                <span className="material-symbols-outlined" onClick={() => document.querySelector('.react-datepicker-wrapper input').focus()}>
                  calendar_month
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-lbl">Return Time</label>
              <div className="input-extend-group">
                <TimePicker
                  onChange={handleReturnTimeChange}
                  value={formData.returnTime}
                  className="form-input cursor-pointer"
                  required
                />
                <span className="material-symbols-outlined" onClick={() => document.querySelector('.react-time-picker').focus()}>
                  calendar_clock
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-lbl">From</label>
          <input
            className="form-input"
            type="text"
            name="from"
            maxLength="100"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-lbl">To</label>
          <input
            className="form-input"
            type="text"
            name="to"
            maxLength="100"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="primary-btn w-full">Submit</button>
      </form>

      {showModal && (
        <SummaryModal
          isOpen={showModal}
          formData={formData}
          onClose={() => setShowModal(false)}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default BookingForm;