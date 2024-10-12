// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="w-full h-full-min-p-tb dashboard-content-main-wrapper flex flex-col items-center justify-between relative">
      <Link to="/" className="dashboard-logo-wrapper">
        <h1 className="MainLogo">Turbo<span>Taxi</span></h1>
      </Link>
      <div className="dashboard-content-wrapper pb-10">
        <h3 className="Page-Title text-center">Instant Rides at Your Fingertips, Anytime, Anywhere</h3>
        <p className="Page-subTitle text-center">Experience the Future of Travel: Fast, Reliable, and Always on Time!</p>
        <Link to="/booking" className="primary-btn my-8">Book Now</Link>
      </div>
    </div>
  );
};

export default Dashboard;
