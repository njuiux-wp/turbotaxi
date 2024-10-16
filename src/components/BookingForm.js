import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryModal from './SummaryModal';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: '',
    uphone: '',
    uemail: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    from: '',
    to: '',
    type: 'one-way',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://turbotaxi-backend.onrender.com';

  const confirmBooking = async () => {
    const response = await fetch(`${backendUrl}/api/book`, {
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
      <h2 className="Page-Title mt-8">Book Your Cab</h2>
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
            <input
              className="form-input"
              type="date"
              name="departureDate"
              min={today}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Departure Time</label>
            <input
              className="form-input"
              type="time"
              name="departureTime"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {formData.type === 'round-trip' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-lbl">Return Date</label>
              <input
                className="form-input"
                type="date"
                name="returnDate"
                min={formData.departureDate || today}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Return Time</label>
              <input
                className="form-input"
                type="time"
                name="returnTime"
                onChange={handleChange}
                required
              />
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