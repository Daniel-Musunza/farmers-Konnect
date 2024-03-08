import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../post_land.css';
import { countries as countriesList } from 'countries-list';
import Spinner from '../components/Spinner';
import { ethers } from 'ethers';

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';

const mycountries = Object.values(countriesList);

function PostLand({ account, contract, provider }) {
    const [chain, setChain] = useState(localStorage.getItem('chain'));
    let user = localStorage.getItem('user' || null);
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



        try {
            if (file) {
                const storage = getStorage()
                const storageRef = ref(storage, 'images/' + file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        console.log(snapshot);
                    },
                    (error) => {
                        console.log(error);
                        setLoading(false);
                        toast.error("Upload failed. Please try again.");
                    },
                    async () => {


                        const currentUser = () => {
                            if (chain === 'web3') {
                                return account;
                            } else if (chain === 'web2') {
                                return user.uid;
                            }
                        }
                        const downloadURL = await getDownloadURL(storageRef);

                        const timestamp = Date.now();

                        const landsCollectionRef = collection(db, "lands");
                        const landRef = doc(landsCollectionRef, timestamp.toString());
                        console.log('landRef:', landRef.path); // Log the path to verify it's not empty or undefined

                        const newDoc = await setDoc(landRef, {
                            hash: downloadURL,
                            user: currentUser,
                            title: titleRef.current.value,
                            landType: landTypeRef.current.value,
                            soilType: soilTypeRef.current.value,
                            country: selectedCountry,
                            price: priceRef.current.value,
                            landDetails: landDetailsRef.current.value
                        });


                        console.log(newDoc)
                        setLoading(false);
                        toast.success("Land details posted successfully.");
                    }
                );
            } else {
                const timestamp = Date.now();

                const landsCollectionRef = collection(db, "lands");
                const landRef = doc(landsCollectionRef, timestamp.toString());
                const currentUser = () => {
                    if (chain === 'web3') {
                        return account;
                    } else if (chain === 'web2') {
                        return user.uid;
                    }
                }
                let title = titleRef.current.value;
                let landType = landTypeRef.current.value;
                let soilType = soilTypeRef.current.value;
                let country = selectedCountry;
                let price = priceRef.current.value;
                let landDetails = landDetailsRef.current.value;

               const newDoc = await setDoc(landRef, {
                    hash: null,
                    id: timestamp,
                    user: currentUser,
                    title: title,
                    landType: landType,
                    soilType: soilType,
                    country: country,
                    price: price,
                    landDetails: landDetails

                });
                console.log(newDoc);

                setLoading(false);
                toast.success("land Details Posted successfully")
                return;
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
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
                                            className="input-field" onChange={handleFileChange} />
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
