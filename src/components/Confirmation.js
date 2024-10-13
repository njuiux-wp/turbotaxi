import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/car-icon.png';

const Confirmation = () => {
  return (
    <div className="confirmation-wrapper">
      <h1 className="MainLogo text-center">Turbo<span>Taxi</span></h1>
      <div className="car-animation-wrapper relative w-full h-[100px] flex items-center my-6">
        <div className="car-animation">
          <img src={backgroundImage} className="w-[150px]" alt="image" />
        </div>
      </div>
      <h2 className="text-lg text-white mb-10">Your booking has been confirmed!</h2>
      <Link to="/" className="primary-btn">Home</Link>
    </div>
  );
};

export default Confirmation;
