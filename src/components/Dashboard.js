import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Detect if the app is running on a mobile device
    const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileMediaQuery.matches);

    // Detect if the PWA is installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsAppInstalled(isInstalled);

    // Handle beforeinstallprompt event for PWA install
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event for triggering later
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setIsAppInstalled(true); // User accepted, hide install button
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="w-full h-full-min-p-tb dashboard-content-main-wrapper flex flex-col items-center justify-between relative">
      <Link to="/" className="dashboard-logo-wrapper">
        <h1 className="MainLogo">Turbo<span>Taxi</span></h1>
      </Link>
      {/* Show "Install" button only on mobile and if the app is not installed */}
      {!isAppInstalled && deferredPrompt && isMobile && (
        <div className="dashboard-content-wrapper pb-10">
          <h3 className="Page-Title text-center">Get the TurboTaxi App for the Best Experience</h3>
          <p className="Page-subTitle text-center">Install our app for faster bookings, seamless ride tracking, and exclusive features, all at your fingertips!</p>
          <button type="button" className="primary-btn my-8 mx-auto w-full" onClick={handleInstallClick}>Install Now</button>
        </div>
      )}

      {/* Show "Book Now" section only on desktop */}
      {!isMobile && (
        <div className="dashboard-content-wrapper pb-10">
          <h3 className="Page-Title text-center">Instant Rides at Your Fingertips, Anytime, Anywhere</h3>
          <p className="Page-subTitle text-center">Experience the Future of Travel: Fast, Reliable, and Always on Time!</p>
          <Link to="/booking" className="primary-btn my-8 mx-auto">Book Now</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
