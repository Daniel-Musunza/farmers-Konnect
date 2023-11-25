import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import ConnectModal from '../components/ConnectModal';

function LandDetails({ lands }) {
  const { id } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);

    const land= lands.find((land) => land.id == id);
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
            <img src={`https://turalhasanov.infura-ipfs.io/ipfs/${land.hash}`} alt="" />
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
          <h3 id="Title">{land.title}, need {land.price}</h3>
          <h2 id="carPrice">{land.climate}, {land.soilType}</h2>
          <p id="carDetails">{land.LandDetails}</p>
        </div>
      </section>
    </div>
  );
}

export default LandDetails;
