import React from 'react';
import carIcon from '../assets/car-icon.png';

const Loader = ({ message }) => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <p className="Page-subTitle fs-26 mb-10 px-8">{message || 'Buckle up! We are confirming your data..'}</p>
                <img src={carIcon} className="w-[150px]" alt="car icon" />
                <div className="moving-road"></div>
            </div>
        </div>
    );
};

export default Loader;
