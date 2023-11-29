import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import ConnectModal from '../components/ConnectModal';
import Spinner from '../components/Spinner';

function LandDetails({ account, contract }) {
  const [loading, setLoading] = useState(null);
  const [lands, setLands] = useState([]);
    const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  //for now 
  // lands=[
  //   {
  //     id: 1,
  //     hash: "image.jpg",
  //     title: "Land In Kenya",
  //     country: "Rainnny",
  //     price: '5000',
  //   }
  // ]
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Call the lands function on the contract
            const landsCount = await contract.landsCount();
            const fetchedLands = [];

            for (let i = 1; i <= landsCount; i++) {
                const land = await contract.lands(i);
                fetchedLands.push(land);
            }

            setLands(fetchedLands);

            // Call the lands function on the contract
            const imagesCount = await contract.imagesCount();
            const fetchedImages = [];

            for (let i = 1; i <= imagesCount; i++) {
                const image = await contract.images(i);
                fetchedImages.push(image);
            }

            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching Data:', error);
        }
    };

    fetchData();
}, []);
  const land = lands.find((land) => land.id == id);
  // Function to toggle the mobile menu
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
    {loading &&
        <Spinner />
    }
    <div className="main-container">
      {isModalOpen && (
        <ConnectModal 
          landId={id}
          landAmount={land.price}
          isModalOpen={isModalOpen} 
          setModalOpen={setModalOpen} 
          loading={loading} 
          setLoading={setLoading} 
          contract={contract}
        />
      )}
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <br />
          <div className="main-image">
            {selectedImage ? (
              <img
                src={`https://gateway.pinata.cloud/ipfs/${selectedImage.hash.substring(6)}`}
                alt=""
              />
            ) : (
              <img src={`https://gateway.pinata.cloud/ipfs/${land.hash.substring(6)}`} alt="" />
             )}

          </div>
          <br />
          <div className="small-img-group" id="ImagesContainer">
            {images
              .filter((image) => image.landId === id)
              .map((image, key) => (
                <img
                  key={key}
                  src={`https://gateway.pinata.cloud/ipfs/${image.hash}`}
                  alt=""
                  onClick={() => handleImageClick(image)}
                   width='200px'
                />
              ))}
          </div>
        </div>
        <div className="buttons">
          <div  style={{ display: 'flex', alignItems: 'center' }}>
            {land.from == account &&
              <button className="upload-button" style={{marginRight: '20px'}}> <Link to={`/add-images/${land.id}`}><h4>Add More Images</h4></Link></button>
            }

            <button className="upload-button" onClick={toggleModal}>BOOK THIS LAND</button>
          </div>
        </div>

        <div className="single-pro-details" style={{ textAlign: 'left' }}>
          <h3 id="Title">Title: {land.title}, {land.price} USD needed </h3>
          <h2 id="carPrice">Country: {land.country}, Soil Type: {land.soilType}</h2>
          <p id="carDetails">{land.LandDetails}</p>
        </div>
      </section>
    </div>
    </>
  );
}

export default LandDetails;
