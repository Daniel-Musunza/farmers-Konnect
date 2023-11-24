import React from 'react';
import '../land_details.css';

function AddImages() {
    return (
        <div className="main-container">
            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <br />
                    <div className="main-image">
                        <img id="mainImage" src="img/kikuyu-land.jpg" alt="" />
                    </div>
                    <br />
                    <div className="small-img-group" id="ImagesContainer">
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <img src="img/kikuyu-land.jpg" alt="" />
                    </div>
                </div>
                <h2 style={{ color: 'black'}}>Add More Images</h2>
                <div className="blog-info">
                    <form method="POST" enctype="multipart/form-data">
                        <div className="input-group">
                            <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif" className="input-field" />
                        </div>
                        <div className="input-group">
                            <button className="upload-button" type="submit">Add Image</button>
                        </div>
                    </form>
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

export default AddImages;
