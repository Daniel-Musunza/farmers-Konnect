import React from 'react';
import '../LoanDetails.css'; // Import CSS file for styling

const RentDetails = () => {
    return (
        <div className="main-container">
            <div className="section" id="top">
                <h2> Land Leasing Structure</h2>
                <br />
             
                <br />
                <h3>Eligibility & Loan Terms:</h3>
                <br />
                <p>At Farmers' Konnect, we understand the importance of finding the right partner for your valuable land, a great way to generate income. You want a secure and efficient platform that connects you with reliable investors and farmers. Here's how our smart contract system fosters trust for you, the landowner:</p>

            </div>

            <div className="section">
                <h3>1. Secure Your Investment with Transparency:
                </h3>
                <br />

                <ul>
                    <li> <b>Verified Tenants: </b>Our platform prioritizes trust. Potential tenants (farmers or investors) go through a verification process, minimizing the risk of unreliable partnerships.
                    </li>
                    <li><b>Immutable Lease Agreements:</b> Smart contracts store all lease details, including land size, location, duration, rent structure, and profit-sharing models (if applicable), on a secure blockchain. This tamper-proof record guarantees clarity and eliminates the risk of misunderstandings.
                    </li>
                    <li><b>Real-Time Updates: </b>The platform provides a user-friendly dashboard where you can track lease progress, receive automated notifications for rent payments, and
                        easily access all relevant documents.
                    </li>
                    <li><b>Customizable Lease Agreements:</b>  Our platform offers customizable lease templates to define specific terms that align with your needs. You have control over factors like lease duration, rental fees, and potential profit-sharing models.
                    </li>
                </ul>
            </div>

            <div className="section">
                <h3>Secure Transactions and Streamlined Processes:</h3>

                <br />
                <ul>
                    <li><b>Escrow Protection:</b>Investor funds are held securely in a smart contract escrow until pre-defined conditions, such as lease agreement signing and land verification completion, are met. This protects you from upfront financial risks.
                    </li>
                    <li><b>Automated Payments:</b>Smart contracts eliminate the need for manual rent collection, ensuring timely and hassle-free payments directly into your account. No more chasing down late payments!
                    </li>
                    <li><b>Reduced Paperwork:</b>Forget complex paperwork and manual documentation. Smart contracts streamline the process, saving you time and effort.
                    </li>

                </ul>
            </div>

            <div className="section">
                <h3>Smart Contract Integration:</h3>
                <br />
                <p>Automates input delivery scheduling and updates for farmers.</p>
                <p>Triggers loan repayment upon successful harvest delivery confirmation.</p>
                <p>Ensures secure and transparent financial transactions.</p>
                <p>Stores data on loan terms, delivery details, and profit-sharing calculations.</p>
            </div>


            <div className="section">
                <h3>Finding the Right Fit for Your Land:
                </h3>
                <br />

                <ul>
                    <li><b>Targeted Matching:</b>Our platform utilizes an intelligent matching system that connects your land with suitable farmers or investors based on your preferences (e.g., crop type, desired lease term).</li>
                    <li><b>Detailed Tenant Profiles: </b>Access profiles of potential tenants, including their agricultural experience, references (if provided), and intended use for your land. This allows you to choose a tenant who aligns with your vision for your land's potential.</li>
                    <li><b>Secure Communication Channels: </b>Secure communication tools within the platform facilitate direct communication with us. You can address questions, clarify details, and ensure a comfortable partnership throughout the lease period
                    </li>
                </ul>

            </div>

        </div>
    );
}

export default RentDetails;
