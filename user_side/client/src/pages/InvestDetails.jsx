import React from 'react';
import '../LoanDetails.css'; // Import CSS file for styling

const InvestDetails = () => {
    return (
        <div className="main-container">
            <div className="section">
                <h2>At Farmers' Konnect, we understand that trust is paramount for investors venturing into agricultural land investment.</h2>
                <br />
                <br />
                <br />
                <img src="img/invest.jpg" alt="" width="300px" />
                <br />
                <br />
                <br />
                <div>
                    <p>While you may be excited about the potential, the need for more information on specific land parcels is crucial. Here's why our smart contract system fosters trust at this critical juncture:</p>
<br></br>
                    <h2>1. Transparency Throughout the Process:</h2>
                    <br/>
                    <ul>
                        <li><strong>Landowner Verification:</strong> All land listings undergo rigorous verification processes before becoming available. This ensures the legitimacy and accuracy of the land details you see.</li>
                        <li><strong>Immutable Data:</strong> Smart contracts store land data and lease terms on a secure and decentralized blockchain. This eliminates the risk of data manipulation, providing a tamper-proof record.</li>
                        <li><strong>Detailed Lease Agreements:</strong> Smart contracts clearly define all aspects of the lease, including land size, location, duration, rent structure, and potential profit-sharing models. You have complete clarity on the investment parameters before committing.</li>
                    </ul>
<br/>
                    <h2>2. Secure Transactions and Reduced Risk:</h2>
                    <br/>
                    <ul>
                        <li><strong>Escrow Functionality:</strong> Investor funds are held securely in a smart contract escrow until pre-defined conditions are met. This could include land verification completion or lease agreement signing. Your funds are protected until everything is in order.</li>
                        <li><strong>Automated Execution:</strong> Smart contracts eliminate the need for manual intervention and potential human error. Once triggered by meeting pre-defined conditions, payments are automatically released, ensuring efficient and secure transactions.</li>
                    </ul>
                    <br/>
                    <h2>3. Mitigating Information Asymmetry:</h2>
                    <br/>
                    <ul>
                        <li><strong>Detailed Landowner Profiles:</strong> Landowner profiles on the platform can provide relevant information beyond basic land details. This can include past agricultural experience, land history, and potential for specific crops. This additional context helps you assess investment suitability.</li>
                        <li><strong>Secure Communication Channels:</strong> Our platform facilitates secure communication channels between investors and landowners. You can directly request and receive additional information about the land parcel you're interested in, fostering a transparent exchange.</li>
                    </ul>
                </div>

            </div>


        </div>
    );
}

export default InvestDetails;
