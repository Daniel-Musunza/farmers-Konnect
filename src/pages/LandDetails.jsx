import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../land_details.css';
import ConnectModal from '../components/ConnectModal';

function LandDetails() {
    const [isModalOpen, setModalOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="main-container">
         {isModalOpen && (
        <ConnectModal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
         )}
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <br />
          <div className="main-image">
            <img id="mainImage" src="C:\projects\farmers-konnect\public\img\kikuyu-land.jpg" alt="" />
          </div>
          <br />
          <div className="small-img-group" id="ImagesContainer">
            <img src="img/kikuyu-land.jpg" alt="" />
            <img src="img/kikuyu-land.jpg" alt="" />
            <img src="img/kikuyu-land.jpg" alt="" />
            <img src="img/kikuyu-land.jpg" alt="" />
          </div>
        </div>
        <div className="buttons">
          <div className="right-data" style={{ display: 'flex' }}>
            <button style={{ marginLeft: '20px',padding: '10px' }}><Link to="/add-images/1"><h4>Add More Images</h4></Link></button>
            <button style={{ backgroundColor: 'green', color: '#fff', fontSize: '25px' , padding: '10px'}} onClick={toggleModal}>BOOK</button>
          </div>
        </div>

        <div className="single-pro-details" style={{ textAlign: 'left' }}>
          <h3 id="Title">5 hectares in Kikuyu, Kenya</h3>
          <h2 id="carPrice">5M</h2>
          <p id="carDetails">It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming. </p>
        </div>
      </section>
    </div>
  );
}

export default LandDetails;
