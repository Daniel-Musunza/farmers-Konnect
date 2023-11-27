import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { countries as countriesList } from 'countries-list';

const mycountries = Object.values(countriesList);

function Rent({ lands, account }) {
    const [filteredRentalLands, setFilteredRentalLand] = useState([]);
    const [selectingCountry, setSelectingCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

    const filterRef = useRef();
    const rentlands = lands.filter((land) => land.landType == 'rent');

    async function Filter(event) {
        event.preventDefault()
        if (filterRef.current.value == "posted") {
            const filteredlands = rentlands.filter((land) => land.from == account);
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
        setSelectedCountry(event.target.value);
        const filteredlands = rentlands.filter((land) => land.country == selectedCountry);
        setFilteredRentalLand(filteredlands);
    };
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
                                <div className="card__corner"></div>
                                <div className="card__img">
                                    <img src={`https://gateway.pinata.cloud/ipfs/${land.hash}`} alt="" />
                                    <span className="card__span">{land.landType}</span>
                                </div>
                                <div className="card-int">
                                    <p className="card-int__title">{land.title}, need {land.price}</p>
                                    <p className="excerpt">{land.country}, {land.soilType}</p>
                                    <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            )}
            <div className="pro-container">
                {rentlands.map((land, key) => {
                    return (
                        <div className="card" key={key}>
                            <div className="card__corner"></div>
                            <div className="card__img">
                                <img src={`https://gateway.pinata.cloud/ipfs/${land.hash}`} alt="" />
                                <span className="card__span">{land.landType}</span>
                            </div>
                            <div className="card-int">
                                <p className="card-int__title">{land.title}, need {land.price}</p>
                                <p className="excerpt">{land.country}, {land.soilType}</p>
                                <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Rent
