import React, { useRef, useState } from 'react';
import { ethers } from 'ethers';

import './connectModal.css';
import { db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";


function ConnectModal({ isModalOpen, setModalOpen, contract, owner, account, setLoading, landId, landAmount }) {
    const [chain, setChain] = useState(localStorage.getItem('chain'));
    const user = JSON.parse(localStorage.getItem('user')) || null;

    const messageRef = useRef();
    // Function to toggle the mobile menu
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };


    async function submitForm(event) {
        setLoading(true);
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

            const timestamp = Date.now();

            const bookingsCollectionRef = collection(db, "bookings");
            const bookingRef = doc(bookingsCollectionRef, timestamp.toString());
            const currentUser = chain === 'web3' ? account : user.uid;
            const price = landAmount;

            await setDoc(bookingRef, {
                id: timestamp,
                user: currentUser,
                owner,
                landId,
                price,
                message: messageRef.current.value
            });
            alert("Land booked successfully");

        } else {
            console.error('Invalid exchange rate. Please try again later.');
            // Handle the error or provide feedback to the user
        }
        setLoading(false);
        toggleModal();
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
