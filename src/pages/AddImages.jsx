import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';

function AddImages({ lands, account, images, uploadImage, captureFile }) {

    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();

    const land = lands.find((land) => land.id == id);

    async function submitForm(event) {
        event.preventDefault()
        uploadImage(id);
    }


    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    return (
        <div className="main-container">
            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <br />
                    <div className="main-image">
                        {selectedImage ? (
                            <img
                                src={`https://gateway.pinata.cloud/ipfs/${selectedImage.hash}`}
                                alt=""
                            />
                        ) : (
                            <img src={`https://gateway.pinata.cloud/ipfs/${land.hash}`} alt="" />
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
                    <form onSubmit={submitForm}>
                        <div className="input-group">
                            <input onChange={captureFile} type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif" className="input-field" />
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
    );
}

export default AddImages;
