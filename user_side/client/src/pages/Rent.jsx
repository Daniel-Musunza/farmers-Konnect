import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { countries as countriesList } from 'countries-list';
import Spinner from '../components/Spinner'

import { db } from "../firebase";
import { getDocs, query, orderBy, collection, doc, deleteDoc } from 'firebase/firestore';

const mycountries = Object.values(countriesList);

function Rent({ contract, account }) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const [lands, setLands] = useState([]);
    const [filteredRentalLands, setFilteredRentalLand] = useState([]);
    const [selectingCountry, setSelectingCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Call the lands function on the contract
                const querySnapshot = await getDocs(
                    query(collection(db, "lands"), orderBy("id", "desc"))
                );

                const fetchedLands = querySnapshot.docs.map((doc) => doc.data());

                setLands(fetchedLands);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lands:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const filterRef = useRef();
    const rentlands = lands.filter((land) => land.landType == 'rent');

    async function Filter(event) {
        event.preventDefault()
        if (filterRef.current.value == "posted") {
            const filteredlands = rentlands.filter((land) => land.user == account);
            setFilteredRentalLand(filteredlands);
            setSelectingCountry(false);
        } else if (filterRef.current.value == "booked") {
            const filteredlands = rentlands.filter((land) => land.user == account);
            setFilteredRentalLand(filteredlands);
            setSelectingCountry(false);

        } else if (filterRef.current.value == "country") {
            setSelectingCountry(true);

        }


    };

    const handleCountryChange = (event) => {
        const selectedCountryValue = event.target.value;
        setSelectedCountry(selectedCountryValue);
        console.log("Selected Country: " + selectedCountryValue);

        const filteredLands = rentlands.filter((land) => land.country === selectedCountryValue);
        setFilteredRentalLand(filteredLands);
    };

    
    const handleDelete = async (e, id) => {
        setLoading(true);
        e.preventDefault();
        try {
            const landsRef = collection(db, 'lands');
            const landRef = doc(landsRef, id);
            await deleteDoc(landRef);
          toast("Land Deleted Successfully ...");
          window.location.reload();
        } catch (error) {
          toast.error("Failed to delete!");
          console.log(error);
        }
        setLoading(false);
      }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className="main-container">
            <div className="heading" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '30px' }}>
                <h3>Arable Farming Land For Rent</h3>
                <div className="input-group" style={{ width: 'fit-content', marginLeft: '30px' }}>
                    <select name="landType" onChange={Filter} ref={filterRef} className="input-field">
                        <option value="">Filter Rental Land Listings According to: </option>
                        <option value="posted">1. What You Posted</option>
                        <option value="booked">2. What You Booked</option>
                        <option value="country">3. Country</option>
                    </select>
                    {selectingCountry && (
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
                    )}

                </div>
            </div>
            {filteredRentalLands.length > 0 && (
                <div className="pro-container">
                    {filteredRentalLands.map((land, key) => {
                        return (
                            <div className="card" key={key}>
                                 {user && (land && land.user == account || land && land.user == user?.uid) && (
                                    <button onClick={(e) => handleDelete(e, land.id)} style={{ color: 'red', background: '#e0ffff', width: '30px', borderRadius: '50px', fontSize: '20px', float: 'right', position: 'relative', zIndex: '1000', cursor: 'pointer' }}><i class="fa-solid fa-trash-can"></i></button>
                                )}
                                <div className="card__corner"></div>
                                <div className="card__img">
                                    <img src={` ${land.hash}`} alt="" style={{ width: '100%' }} />
                                    <span className="card__span">To let</span>
                                </div>
                                <div className="card-int">
                                    <p className="card-int__title">{land.title}, USD {land.price} needed</p>
                                    <p className="excerpt">{land.country}, {land.soilType}</p>
                                    <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            )}
            {rentlands.length > 0 ? (
                <div className="pro-container">
                    {rentlands.map((land, key) => {
                        return (
                            <div className="card" key={key}>
                                <div className="card__corner"></div>
                                <div className="card__img">
                                    <img src={` ${land.hash}`} alt="" style={{ width: '100%' }} />
                                    <span className="card__span">To let</span>
                                </div>
                                <div className="card-int">
                                    <p className="card-int__title">{land.title}, USD {land.price} needed</p>
                                    <p className="excerpt">{land.country}, {land.soilType}</p>
                                    <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            ) : (
                <h3 style={{ textAlign: 'center' }}>No land available for rent</h3>
            )}
        </div>
    )
}

export default Rent
