import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../land_details.css';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

import { db } from "../firebase";
import { getDocs, query, collection, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function AddImages({ account, contract }) {
    const [chain, setChain] = useState(localStorage.getItem('chain'));
    const user = JSON.parse(localStorage.getItem('user')) || null;

    const [loading, setLoading] = useState(null);
    const [lands, setLands] = useState([]);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!file) {
            setLoading(false);
            alert("Please select an image");
            return;
        }
    
        try {
            const storage = getStorage();
            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle upload state changes if needed
                    console.log(snapshot);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                    toast.error("Upload failed. Please try again.");
                },
                async () => {
                    try {
                        const currentUser = chain === 'web3' ? account : user.uid;
                        const downloadURL = await getDownloadURL(storageRef);
    
                        const timestamp = Date.now();
    
                        const landsCollectionRef = collection(db, "images");
                        const landRef = doc(landsCollectionRef, timestamp.toString());
    
                        await setDoc(landRef, {
                            hash: downloadURL,
                            user: currentUser,
                            landId: id,
                            id: timestamp
                        });
    
                        setLoading(false);
                        toast.success("Image posted successfully.");
                        // Fetch images after posting
                        fetchData();
                    } catch (error) {
                        console.error(error);
                        setLoading(false);
                        toast.error("An error occurred while posting the image.");
                    }
                }
            );
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("An error occurred while uploading the image.");
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
