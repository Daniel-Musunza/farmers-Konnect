import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import Spinner from '../components/Spinner';

function AddImages({ account, contract }) {
    const [loading, setLoading] = useState(null);
    const [lands, setLands] = useState([  {
        id: 1,
        hash: "image.jpg",
        title: "Land In Kenya",
        country: "Rainnny",
        price: '5000',
      }]);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!file) {
            setLoading(false);
            alert("Please Select an Image");
            setFile(null);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                    "Content-Type": "multipart/form-data",
                },
            });
            const hash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            const user = account;
            const landId = id;
            console.log(user, hash, landId);
            contract.uploadImage(user, hash, landId);


            setFile(null);
        } catch (error) {
            console(error);
        }
        setLoading(false);
        alert("Successfully Image Uploaded");
        window.location.reload();
        setFile(null);



    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        e.preventDefault();
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
                                    />
                                ))}
                        </div>
                    </div>
                    <h2 style={{ color: 'black' }}>Add More Images</h2>
                    <div className="blog-info">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input onChange={retrieveFile} type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif" className="input-field" />
                            </div>
                            <div className="input-group">
                                <button className="upload-button" type="submit" >Add Image</button>
                            </div>
                        </form>
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

export default AddImages;
