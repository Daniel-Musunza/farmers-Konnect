import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import Spinner from '../components/Spinner';

function AddImages({ account, contract }) {
    const [loading, setLoading] = useState(null);
    const [lands, setLands] = useState([]);
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


    useEffect(() => {
        // Load lands from local storage and combine with fetched lands
        const localLands = JSON.parse(localStorage.getItem('lands')) || [];
        console.log(localLands);
        setLands((prevLands) => [...prevLands, ...localLands]);

        const localImages = JSON.parse(localStorage.getItem('images')) || [];
        console.log(localImages);
        setImages((prevImages) => [...prevImages, ...localImages]);

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

        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                pinata_api_key: `7f5c8eb0809e099a09e4`,
                pinata_secret_api_key: `ac902cb198a06e9de7bf565a75455bdfb37c000cd2021f38747009635f062fff`,
                "Content-Type": "multipart/form-data",
            },
        });
        const hash = `https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const user = account;
        const landId = id;
        let newImageId = Date.now();


        const newImage = {
            id: newImageId,
            user: user,
            hash: hash,
            landId: landId
        }

        // Retrieve existing lands from local storage
        const existingImages = JSON.parse(localStorage.getItem('images')) || [];

        // Update the lands with the new land
        const updatedImages = [...existingImages, newImage];

        // Save the updated lands to local storage
        localStorage.setItem('images', JSON.stringify(updatedImages));

        try {

            console.log(user, hash, landId);
            contract.uploadImage(user, hash, landId);


            setFile(null);
        } catch (error) {
            console(error);

            if (error.response && error.response.status === 400) {
                // Handle specific error related to the transaction rejection
                alert("Transaction rejected. Please check your gas or balance.");
            } else {
                // Handle other errors
                alert("An error occurred while uploading land. Please try again.");
            }
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
                        <h3 id="Title">Title: {land && land.title}, {land && land.price} USD needed </h3>
                        <h2 id="carPrice">Country: {land && land.country}, Soil Type: {land && land.soilType}</h2>
                        <p id="carDetails">{land && land.landDetails}</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AddImages;
