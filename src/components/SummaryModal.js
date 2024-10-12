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
                <h2 className="Page-Title my-0">Summary</h2>
                <div className="w-full my-6">
                    <div className="userInfo-wrapper">
                        <p className="Page-subTitle fs-16 font-[600] mb-3">
                            <span>{formData.uname}</span>
                        </p>
                        <p className="Page-subTitle flex items-center mb-2">
                            <span class="material-symbols-outlined fs-16 link-color mr-2">
                                mail
                            </span>
                            <span>{formData.uemail}</span>
                        </p>
                        <p className="Page-subTitle flex items-center mb-2">
                            <span class="material-symbols-outlined fs-16 link-color mr-2">
                                call
                            </span>
                            <span>{formData.uphone}</span>
                        </p>
                        <p className="Page-subTitle flex items-center mb-2">
                            <span class="material-symbols-outlined fs-16 link-color mr-2">
                                route
                            </span>
                            <span>{formData.type}</span>
                        </p>
                        <p className="Page-subTitle">
                            <b className="font-[600] text-themegrey fs-12">Departure: </b>
                            <span className="fs-12">{formattedDepartureDate} - {formData.departureTime}</span>
                        </p>
                        {formData.type === 'round-trip' && (
                            <>
                                <p className="Page-subTitle">
                                    <b className="font-[600] text-themegrey fs-12">Return: </b>
                                    <span className="fs-12">{formattedReturnDate} - {formData.returnTime}</span>
                                </p>
                            </>
                        )}
                    </div>
                    <div className="locationBox-wrapper">
                        <p className="Page-subTitle mb-1">
                            {formData.from}
                        </p>
                        <p className="Page-subTitle mb-1">
                            {formData.to}
                        </p>
                    </div>
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
