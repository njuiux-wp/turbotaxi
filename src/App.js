import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import Modal from 'react-modal';

const App = () => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Router>
      <div className="wrapper-container w-full max-w-[400px] mx-auto min-h-screen px-[20px] py-[20px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback Route */}
        </Routes>
      </div>
    </Router>
  );
};

const NotFound = () => <div>404 Not Found</div>;

export default App;
