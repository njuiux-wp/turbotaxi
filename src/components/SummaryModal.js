import React from 'react';
import Modal from 'react-modal';

const SummaryModal = ({ isOpen, formData, onClose, onConfirm }) => {
    // Format the dates if they exist
    const formattedDepartureDate = formData.departureDate
        ? formData.departureDate.toLocaleDateString()
        : 'N/A';
    const formattedReturnDate = formData.returnDate
        ? formData.returnDate.toLocaleDateString()
        : 'N/A';

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="w-full">
                <h2 className="Page-Title my-2">Summary</h2>
                <div className="w-full my-6">
                    <p className="Page-subTitle">Name: {formData.uname}</p>
                    <p className="Page-subTitle">Email: {formData.uemail}</p>
                    <p className="Page-subTitle">Phone Number: {formData.uphone}</p>
                    <p className="Page-subTitle">Type: {formData.type}</p>
                    <p className="Page-subTitle">Departure Date: {formattedDepartureDate}</p>
                    <p className="Page-subTitle">Departure Time: {formData.departureTime}</p>
                    {formData.type === 'round-trip' && (
                        <>
                            <p className="Page-subTitle">Return Date: {formattedReturnDate}</p>
                            <p className="Page-subTitle">Return Time: {formData.returnTime}</p>
                        </>
                    )}
                    <p className="Page-subTitle">From: {formData.from}</p>
                    <p className="Page-subTitle">To: {formData.to}</p>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                    <button type="button" className="secondary-btn" onClick={onClose}>Close</button>
                    <button type="button" className="primary-btn" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

export default SummaryModal;
