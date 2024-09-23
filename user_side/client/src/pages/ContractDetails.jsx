import React from 'react';
import { Link } from 'react-router-dom';
import '../LoanDetails.css'; // Import CSS file for styling

const ContractDetails = () => {
  return (
    <div className="main-container">
      <div className="section" id="top">
        <div className="canola-contract-farming">
          <h1>CANOLA OIL CONTRACT FARMING</h1>
          <p>
            At Farmers' Konnect, we’re committed to revolutionizing agriculture by
            bridging the gap between farmers and markets through our innovative Canola
            Contract Farming Module. Our approach ensures that farmers reap the full
            benefits of their hard work while providing buyers with a consistent supply of
            premium canola oil.
          </p>
          <img src="https://i0.wp.com/farmerstrend.co.ke/wp-content/uploads/2017/08/canola-farming.jpg" alt="" />
          <h2>Why Do Contract Farming with Us?</h2>
          <p>
            Contract farming offers a win-win solution for all involved. Farmers gain access
            to guaranteed markets, expert support, and essential resources, while buyers secure
            a reliable source of high-quality canola. Here’s how Farmers' Konnect makes this a reality:
          </p>
          <h3>Our Approach</h3>
          <ol>
            <li>
              <strong>Strategic Partnerships</strong>: We collaborate with top-tier buyers, including processors, exporters, and retailers, to secure long-term contracts that align with our farmers' capabilities and production goals.
            </li>
            <li>
              <strong>Empowering Farmers</strong>: Our commitment starts with comprehensive training in Good Agricultural Practices (GAP). We provide knowledge, tools, and continuous support, while facilitating access to quality inputs—seeds, fertilizers, and pesticides—on credit.
            </li>
            <li>
              <strong>Clear, Fair Contracts</strong>: Farmers enter clear, legally binding agreements that outline expectations on quality, quantity, price, and delivery timelines.
            </li>
            <li>
              <strong>Ongoing Support and Monitoring</strong>: We offer ongoing support throughout the growing season, with regular farm visits and technical advice.
            </li>
            <li>
              <strong>Efficient Logistics and Marketing</strong>: Our logistics team ensures efficient collection, packaging, and transportation of harvested canola, while also handling the marketing.
            </li>
          </ol>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3PyWjSjZwEPV4gXUbzhrbxX5CW9djrCVvvGduDFBeFZVib7eSZWxEJhv3coUxKQWyGY&usqp=CAU" alt="" />
          <h3>Steps to Get Involved</h3>
          <h4>For Farmers:</h4>
          <ol>
            <li><Link to="/signup">Join Us</Link> and become part of the Farmers' Konnect network.</li>
            <li>Participate in our training programs and follow GAP protocols.</li>
            <li>Use the inputs and tools we provide to maximize your yield.</li>
            <li>Meet the agreed-upon standards and timelines, and we’ll handle the rest.</li>
          </ol>
          <h4>For Investors:</h4>
          <ol>
            <li>Partner with confidence in a model proven to deliver returns while making a real difference in communities.</li>
            <li>Support growth by helping to build the infrastructure and support systems needed to scale our operations.</li>
            <li>Track performance and impact through transparent reporting.</li>
          </ol>
          <p>
            At Farmers' Konnect, we’re not just growing crops—we’re growing opportunities. Join us in making a difference.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContractDetails;
