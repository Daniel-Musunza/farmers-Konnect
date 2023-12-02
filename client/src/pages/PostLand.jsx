import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../post_land.css';
import { countries as countriesList } from 'countries-list';
import Spinner from '../components/Spinner';

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
    
        try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                // headers: {
                //     pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                //     pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                //     "Content-Type": "multipart/form-data",
                // },
                headers: {
                    pinata_api_key: `7f5c8eb0809e099a09e4`,
                    pinata_secret_api_key: `ac902cb198a06e9de7bf565a75455bdfb37c000cd2021f38747009635f062fff`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const hash = `https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            const user = account;
            const title = titleRef.current.value;
            const landType = landTypeRef.current.value;
            const soilType = soilTypeRef.current.value;
            const country = selectedCountry;
            const price = priceRef.current.value;
            const landDetails = landDetailsRef.current.value;
    
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
    
            // Navigate to "/add-images/${id}"
            navigate(`/add-images/${id}`);
    
            setFile(null);
            setLoading(false);
            alert("Successfully Land Posted");
        } catch (error) {
            console.error("Error uploading land:", error);
    
            if (error.response && error.response.status === 400) {
                // Handle specific error related to the transaction rejection
                alert("Transaction rejected. Please check your gas or balance.");
            } else {
                // Handle other errors
                alert("An error occurred while uploading land. Please try again.");
            }
    
            setLoading(false);
            setFile(null);
        }
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
