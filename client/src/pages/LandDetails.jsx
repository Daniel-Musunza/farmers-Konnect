import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import ConnectModal from '../components/ConnectModal';
import Spinner from '../components/Spinner';

function LandDetails({ account, contract }) {
  const [loading, setLoading] = useState(null);
  const [lands, setLands] = useState(
    [
      {
        id: '1',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.',
        title: 'Arable Land In Kikuyu.',
        landType: 'invest',
        price: '2000',
        country: 'Kenya',
        soilType: 'Loom',
        landDetails: 'It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.',
        user: '0xBD90db46f1EE284928dC127A1143a37189D0bc70'
      },
      {
        id: '2',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.',
        title: 'Arable Land For Farming Ocra',
        landType: 'invest',
        price: '5000',
        country: 'Albania',
        soilType: 'Loose Sand',
        landDetails: 'It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.',
        user: '0xBD90db46f1EE284928dC127A1143a37189D0bc70'
      },
      {
        id: '3',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.',
        title: 'Arable Land In Kikuyu.',
        landType: 'rent',
        price: '2000',
        country: 'Kenya',
        soilType: 'Loom',
        landDetails: 'It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.',
        user: '0xBD90db46f1EE284928dC127A1143a37189D0bc70'
      },
      {
        id: '4',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.',
        title: 'Arable Land For Farming Ocra',
        landType: 'rent',
        price: '5000',
        country: 'Albania',
        soilType: 'Loose Sand',
        landDetails: 'It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.',
        user: '0xBD90db46f1EE284928dC127A1143a37189D0bc70'
      }
    ]);
  const [images, setImages] = useState(
    [
      {
       landId: '1',
       hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.'
      },
      {
        landId: '2',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.'
      },
      {
        landId: '3',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.'
      },
      {
         landId: '4',
         hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.'
      },
      {
        landId: '2',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.'
       },
       {
         landId: '1',
         hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.'
       },
       {
        landId: '4',
        hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.'
       },
       {
         landId: '3',
         hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.'
       }
    ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

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
                  src={` ${selectedImage.hash.substring(6)}`}
                  alt=""
                />
              ) : (
                <img src={` ${land.hash.substring(6)}`} alt="" />
              )}

            </div>
            <br />
            <div className="small-img-group" id="ImagesContainer">
              {images
                .filter((image) => image.landId === id)
                .map((image, key) => (
                  <img
                    key={key}
                    src={` ${image.hash}`}
                    alt=""
                    onClick={() => handleImageClick(image)}
                    width='200px'
                  />
                ))}
            </div>
          </div>
          <div className="buttons">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {land.user == account &&
                <button className="upload-button" style={{ marginRight: '20px' }}> <Link to={`/add-images/${land.id}`}><h4>Add More Images</h4></Link></button>
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
