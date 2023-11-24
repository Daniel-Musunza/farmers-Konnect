import './connectModal.css';

function ConnectModal({isModalOpen, setModalOpen}) {

    // Function to toggle the mobile menu
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    return (
        <>
            {isModalOpen && (
                <div className="modal-container">

                    <div className="pro-container2">
                        <div className="close" onClick={toggleModal}><i className="fa-regular fa-circle-xmark"></i></div>
                        <div className="create-post">

                            <div className="contain">
                                <div className="land-info">
                                    <form method="POST" enctype="multipart/form-data">


                                        <div className="input-group">
                                            <input type="number" name="amount" placeholder="Enter Amount" className="input-field" />
                                        </div>

                                        <div className="input-group">
                                            <textarea name="landDetails" rows="2" placeholder="Enter Your Message"
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
