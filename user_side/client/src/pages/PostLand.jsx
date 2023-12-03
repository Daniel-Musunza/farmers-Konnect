import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../post_land.css';
import { countries as countriesList } from 'countries-list';
import Spinner from '../components/Spinner';
import { ethers } from 'ethers';

const mycountries = Object.values(countriesList);

function PostLand({ account, contract, provider }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const titleRef = useRef();
    const landTypeRef = useRef();
    const soilTypeRef = useRef();
    const priceRef = useRef();
    const landDetailsRef = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            setLoading(false);
            alert("Please Select an Image");
            setFile(null);
            return;
        }

        let formData = new FormData();
        formData.append("file", file);

        let resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                pinata_api_key: `7f5c8eb0809e099a09e4`,
                pinata_secret_api_key: `ac902cb198a06e9de7bf565a75455bdfb37c000cd2021f38747009635f062fff`,
                "Content-Type": "multipart/form-data",
            },
        });


        // Handle error by storing land information in local storage
        let hash = `https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        let user = account;
        let title = titleRef.current.value;
        let landType = landTypeRef.current.value;
        let soilType = soilTypeRef.current.value;
        let country = selectedCountry;
        let price = priceRef.current.value;
        let landDetails = landDetailsRef.current.value;
        let newLandId = Date.now();

        const newLand = {
            id: newLandId,
            user: user,
            hash: hash,
            title: title,
            landType: landType,
            soilType: soilType,
            country: country,
            price: price,
            landDetails: landDetails
        }

        // Retrieve existing lands from local storage
        const existingLands = JSON.parse(localStorage.getItem('lands')) || [];

        // Update the lands with the new land
        const updatedLands = [...existingLands, newLand];

        // Save the updated lands to local storage
        localStorage.setItem('lands', JSON.stringify(updatedLands));

        try {
            console.log(user, hash, title, landType, soilType, country, price, landDetails);

            const uploadLandResult = await contract.uploadLand(
                user,
                hash,
                title,
                landType,
                soilType,
                country,
                price,
                landDetails
            );

            // Assuming uploadLandResult contains the ID of the uploaded land
            const id = uploadLandResult.id;

            const receipt = await uploadLandResult.wait();
            console.log('Transaction Receipt:', receipt);

            setFile(null);
            setLoading(false);
            alert("Land Posted Successfully ...");
            // Navigate to "/add-images/${id}"
            // navigate(`/add-images/${id}`);
        } catch (error) {
            console.error("Error uploading land:", error);
            setLoading(false);
            setFile(null);
        }
        alert("land Details Posted successfully")
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
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };


    return (
        <>
            {loading &&
                <Spinner />
            }
            <div className="main-container" style={{ maxWidth: '800px' }}>
                <div className="pro-container2" style={{ width: '100%' }}>
                    <div className="create-post">

                        <div className="contain">

                            <div className="land-info">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <select name="landType" ref={landTypeRef} className="input-field">
                                            <option value="">Choose (Need an investor/Want to Lease)</option>
                                            <option value="invest">In need of an investor</option>
                                            <option value="rent">To Let/Lease</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select id="countrySelect" className="input-field" value={selectedCountry} onChange={handleCountryChange}>
                                            <option value="">-- Select Country --</option>
                                            {mycountries.map((country) => (
                                                <option key={country.name} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" name="title" ref={titleRef} placeholder="Enter Title of the post" className="input-field" />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" name="soilType" ref={soilTypeRef} placeholder="Enter Soil Type" className="input-field" />
                                    </div>

                                    <div className="input-group">
                                        <input type="number" name="price" ref={priceRef} placeholder="Enter Amount Needed (USD)" className="input-field" />
                                    </div>
                                    <div className="input-group">
                                        <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif"
                                            className="input-field" onChange={retrieveFile} />
                                    </div>
                                    <div className="input-group">
                                        <textarea name="landDetails" ref={landDetailsRef} rows="2" placeholder="Enter Land Details"
                                            className="textarea-field"></textarea>
                                    </div>
                                    <div className="input-group">
                                        <button className="upload-button" type="submit">Post Land Listing</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostLand
