import React from 'react';
import '../LoanDetails.css'; // Import CSS file for styling

const LoanDetails = () => {
  return (
    <div className="main-container">
      <div className="section">
      <h2>FARMERS’ KONNECT’S LOAN SERVICE STRUCTURE</h2>
      <br />
      <br />
      <img src="img/loan.jpg" alt="" width="300px"/>
      <br />
      <br />
        <br />
        <h3>Eligibility & Loan Terms:</h3>
        <br />
        <p>Farmer Qualification: Register on Farmers Konnect, verify land ownership/lease agreements, and submit experience/references (optional). Propose a detailed crop plan with projected yield.</p>
        <p>Loan Amount: Based on land size, chosen crop, and estimated input needs.</p>
        <p>Input Selection: Choose from a pre-approved list of high-quality inputs required and listed suppliers.</p>
        <p>Repayment Share: A predetermined percentage of the yield sale will be returned to Farmers Konnect to pay the loan.</p>
        <p>Loan Duration: Aligned with the specific crop's growing season.</p>

        <img src="img/loan-e.png.crdownload" alt="" />
      </div>

      <div className="section">
        <h3>Loan Collection Structure:</h3>
        <br />
        <p>Harvest Delivery and Quality Assessment: Farmers Konnect's team inspects the produce to ensure quality standards are met. Upon delivering the agreed-upon share of the harvest to a designated contract buyer.</p>
        <p>Market Sale: Farmers Konnect sells the harvested crop at a designated value.</p>
        <p>Repayment & Profit Sharing done by the smart contracts that will:</p>
        <br />
        <ul>
          <li>Deduct the cost of loaned inputs and platform fees from the sale proceeds.</li>
          <li>Distribute the remaining profit according to a predetermined split between the farmer and investor.</li>
          <li>Farmers’ Konnect will receive their share based on the contract terms (e.g., percentage of profit).</li>
        </ul>
      </div>

      <div className="section">
        <h3>Terms of Agreement:</h3>
        <br />
        <p>Legal agreement outlines:</p>
        <br />
        <ul>
          <li>Loan amount and type of inputs provided.</li>
          <li>Repayment share percentage and delivery procedures.</li>
          <li>Farmer's responsibilities regarding crop management and quality.</li>
          <li>Dispute resolution will be led by the legal teams from both parties.</li>
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

      <div className="read-more section">
        {/* <h2>READ MORE</h2> */}

        <div className="section">
          <h3>At Farmers' Konnect, we understand that trust is paramount for investors venturing into agricultural land investment.</h3>
          <br />
          <br />
          <p>While you may be excited about the potential, the need for more information on specific land parcels is crucial. Here's why our smart contract system fosters trust at this critical juncture:</p>
          <ol>
            <li><strong>Transparency Throughout the Process:</strong>
              <ul>
                <li>Landowner Verification: All land listings undergo rigorous verification processes before becoming available. This ensures the legitimacy and accuracy of the land details you see.</li>
                <li>Immutable Data: Smart contracts store land data and lease terms on a secure and decentralized blockchain. This eliminates the risk of data manipulation, providing a tamper-proof record.</li>
                <li>Detailed Lease Agreements: Smart contracts clearly define all aspects of the lease, including land size, location, duration, rent structure, and potential profit-sharing models. You have complete clarity on the investment parameters before committing.</li>
              </ul>
            </li>
            {/* Include other numbered points here */}
          </ol>
        </div>

        {/* Include content for 'LAND TO RENT' part similarly */}

      </div>
    </div>
  );
}

export default LoanDetails;
