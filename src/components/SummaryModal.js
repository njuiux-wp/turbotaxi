import React, { useState } from 'react';
import Modal from 'react-modal';
import carIcon from '../assets/car-icon.png';
import Loader from '../widgets/Loader';

const SummaryModal = ({ isOpen, formData, onClose, onConfirm }) => {
    const [isLoading, setIsLoading] = useState(false);

    const formattedDepartureDate = formData.departureDate || 'N/A';
    const formattedReturnDate = formData.returnDate || 'N/A';

    const handleConfirmClick = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            {/* Full-page loader */}
            {isLoading && <Loader message="Buckle up! We are confirming your data.." />}

            <div className="w-full">
                <h2 className="Page-Title mt-0">Summary</h2>
                <div className={`locationBox-wrapper ${formData.type === 'round-trip' ? 'locationBox-roundTrip-wrapper' : ''}`}>
                    <div className="carIcon-wrapper">
                        <img src={carIcon} className="w-full" alt="car icon" />
                    </div>
                    <div className={`dateTime-wrapper ${formData.type === 'round-trip' ? 'roundTrip-dateTime-wrapper' : ''}`}>
                        <div className="Page-subTitle">
                            <span className="fs-12">{formattedDepartureDate} - {formData.departureTime}</span>
                        </div>
                        {formData.type === 'round-trip' && (
                            <>
                                <div className="Page-subTitle">
                                    <span className="fs-12">{formattedReturnDate} - {formData.returnTime}</span>
                                </div>
                            </>
                        )}
                    </div>
                    <p className="Page-subTitle mb-1">
                        {formData.from}
                    </p>
                    <p className="Page-subTitle text-right mb-1">
                        <span className="font-[600]">{formData.to}</span>
                        <span className="material-symbols-outlined locationPin">
                            location_on
                        </span>
                    </p>
                </div>
                <div className="w-full my-6">
                    <div className="userInfo-wrapper">
                        <p className="Page-subTitle fs-16 font-[600] mb-3">
                            <span>{formData.uname}</span>
                        </p>
                        <p className="Page-subTitle flex items-center mb-2">
                            <span className="material-symbols-outlined fs-16 link-color mr-2">
                                mail
                            </span>
                            <span>{formData.uemail}</span>
                        </p>
                        <p className="Page-subTitle flex items-center mb-2">
                            <span className="material-symbols-outlined fs-16 link-color mr-2">
                                call
                            </span>
                            <span>{formData.uphone}</span>
                        </p>
                        <p className="Page-subTitle flex items-center">
                            <span className="material-symbols-outlined fs-16 link-color mr-2">
                                route
                            </span>
                            <span>{formData.type}</span>
                        </p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                    <button type="button" className="secondary-btn" onClick={onClose} disabled={isLoading}>
                        Close
                    </button>
                    <button type="button" className="primary-btn" onClick={handleConfirmClick} disabled={isLoading}>
                        {isLoading ? 'Confirming...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SummaryModal;
