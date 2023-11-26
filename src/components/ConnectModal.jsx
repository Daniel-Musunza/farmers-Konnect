import React, { useRef } from 'react';
import { ethers } from 'ethers';

import './connectModal.css';

function ConnectModal({isModalOpen, setModalOpen, bookLand, landId}) {
    const amountRef = useRef();
    const messageRef = useRef();
    // Function to toggle the mobile menu
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    async function submitForm(event) {
        event.preventDefault()
        bookLand(landId, ethers.utils.parseUnits(amountRef.current.value), messageRef.current.value);
    }
    return (
        <>
            {isModalOpen && (
                <div className="modal-container">

                    <div className="pro-container2">
                        <div className="close" onClick={toggleModal}><i className="fa-regular fa-circle-xmark"></i></div>
                        <div className="create-post">

                            <div className="contain">
                                <div className="land-info">
                                    <form onSubmit={submitForm}>


                                        <div className="input-group">
                                            <input ref={amountRef} type="number" name="amount" placeholder="Enter Amount (USD)" className="input-field" />
                                        </div>

                                        <div className="input-group">
                                            <textarea ref={messageRef} name="landDetails" rows="2" placeholder="Enter Your Message"
                                                className="textarea-field"></textarea>
                                        </div>
                                        <div className="input-group">
                                            <button className="upload-button" type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConnectModal
