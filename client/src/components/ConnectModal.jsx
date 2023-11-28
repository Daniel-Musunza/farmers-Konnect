import React, { useRef } from 'react';
import { ethers} from 'ethers';

import './connectModal.css';

function ConnectModal({ isModalOpen, setModalOpen, bookLand, landId, landAmount }) {
   
    const messageRef = useRef();
    // Function to toggle the mobile menu
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
 

    async function submitForm(event) {
        event.preventDefault();
    
        const amountInUSD = parseFloat(landAmount);
    
        if (isNaN(amountInUSD)) {
            console.error('Invalid amount input. Please enter a valid number.');
            // Handle the error or provide feedback to the user
            return;
        }
    
        // Fetch the latest exchange rate
        const exchangeRate = 4000;
    
        if (exchangeRate !== null && !isNaN(exchangeRate)) {
            // Convert the amount to ethers using the fetched exchange rate
            const amountInEth = amountInUSD / exchangeRate;
    
            // Use ethers.utils.parseUnits to convert the amount to wei (the smallest unit of ether)
            const amountInWei = ethers.utils.parseUnits(amountInEth.toString(), 'ether');
    
            // Now you can use amountInWei in your bookLand function
            bookLand(landId, amountInWei, messageRef.current.value);
        } else {
            console.error('Invalid exchange rate. Please try again later.');
            // Handle the error or provide feedback to the user
        }
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
                                            <label htmlFor="">Amount (USD)</label>
                                            <input value={landAmount} type="number" name="amount" disabled className="input-field" />
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
