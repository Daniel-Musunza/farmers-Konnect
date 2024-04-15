import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import ConnectModal from '../components/ConnectModal';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';


import { db } from "../firebase";
import { getDocs, query, collection, setDoc, doc } from "firebase/firestore";

function LandDetails({ account, contract }) {
  const [chain, setChain] = useState(localStorage.getItem('chain'));
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const [loading, setLoading] = useState(null);
  const [lands, setLands] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      // Call the lands function on the firebare
      const landsQuerySnapshot = await getDocs(
        query(collection(db, "lands"))
      );

      const fetchedLands = landsQuerySnapshot.docs.map((doc) => doc.data());

      setLands(fetchedLands);

      // Call the images function on the firebare
      const imagesQuerySnapshot = await getDocs(
        query(collection(db, "images"))
      );

      const fetchedImages = imagesQuerySnapshot.docs.map((doc) => doc.data());

      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching Data:', error);
    }
  };

useEffect(() => {
 
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
            account={account}
            owner={land.user}
          />
        )}
        <section id="prodetails" className="section-p1">
          <div className="single-pro-image">
            <div className="contract" style={{ padding: '10px', borderRadius: '10px', position: 'fixed', zIndex: '1', textAlign: 'center', right: '10px', background: "#fff", width: '300px', minHeight: '200px' }}>
              <h2 style={{ marginTop: '20px' }}>Contract Status</h2>
              <p style={{ marginTop: '20px' }}>You have not yet booked this land. Please book this Land.</p>
            </div>


            <br />
            <div className="main-image">
              {selectedImage ? (
                <img src={selectedImage.hash && selectedImage.hash} alt="" />
              ) : (
                <img src={land && land.hash && land.hash} alt="" />
              )}
            </div>

            <br />
            <div className="small-img-group" id="ImagesContainer">
                            {images
                                .filter((image) => image.landId === id)
                                .map((image, key) => (
                                    <img
                                        key={key}
                                        src={image.hash && image.hash}
                                        alt=""
                                        onClick={() => handleImageClick(image)}
                                        width='200px'
                                    />
                                ))}
                        </div>
          </div>
          <div className="buttons">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {land && land.user == account || land && land.user == user?.uid&&
                <button className="upload-button" style={{ marginRight: '20px' }}> <Link to={`/add-images/${land.id}`}><h4>Add More Images</h4></Link></button>
              }

              <button className="upload-button" onClick={toggleModal}>BOOK THIS LAND</button>
            </div>
          </div>

          <div className="single-pro-details" style={{ textAlign: 'left' }}>
            <h3 id="Title">Title: {land && land.title}, {land && land.price} USD needed </h3>
            <h2 id="carPrice">Country: {land && land.country}, Soil Type: {land && land.soilType}</h2>
            <p id="carDetails">{land && land.landDetails}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandDetails;
