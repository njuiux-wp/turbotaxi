import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/car-bg-new1.png';

const Confirmation = () => {
  return (
    <div className="confirmation-wrapper">
      <h1 className="MainLogo text-center">Turbo<span>Taxi</span></h1>
      <img src={backgroundImage} className="w-full" alt="image" />
      <h2 className="text-lg text-white mb-10">Your booking has been confirmed!</h2>
      <Link to="/" className="primary-btn">Home</Link>
    </div>
  );
};

export default Confirmation;
