import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { countries as countriesList } from 'countries-list';
import Spinner from '../components/Spinner'
import { db } from "../firebase";
import { getDocs, query, orderBy, collection } from 'firebase/firestore';
const mycountries = Object.values(countriesList);

function Invest({ account }) {
    const [lands, setLands] = useState([]);
    const [filteredInvestmentLands, setFilteredInvestmentLand] = useState([]);
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

    const investlands = lands.filter((land) => land.landType == 'invest');

    async function Filter(event) {
        event.preventDefault()
        if (filterRef.current.value == "posted") {
            const filteredlands = investlands.filter((land) => land.user == account);
            setFilteredInvestmentLand(filteredlands);
            setSelectingCountry(false);
        } else if (filterRef.current.value == "booked") {
            const filteredlands = investlands.filter((land) => land.user == account);
            setFilteredInvestmentLand(filteredlands);
            setSelectingCountry(false);

        } else if (filterRef.current.value == "country") {
            setSelectingCountry(true);

        }


    };

    const handleCountryChange = (event) => {
        const selectedCountryValue = event.target.value;
        setSelectedCountry(selectedCountryValue);
        console.log("Selected Country: " + selectedCountryValue);

        const filteredLands = investlands.filter((land) => land.country === selectedCountryValue);
        setFilteredInvestmentLand(filteredLands);
    };
    if (loading) {
        return <Spinner />
      }
    return (
        <div className="main-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="heading" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '30px' }}>
                <h3>Farms waiting for you to invest in</h3>
                <div className="input-group" style={{ width: 'fit-content', marginLeft: '30px' }}>
                    <select name="landType" onChange={Filter} ref={filterRef} className="input-field">
                        <option value="">Filter Investment Land Listings According to: </option>
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
            {filteredInvestmentLands.length > 0 && (
                <div className="pro-container">
                    {filteredInvestmentLands.map((land, key) => {
                        return (
                            <div className="card" key={key}>
                                <div className="card__corner">delete</div>
                                <div className="card__img">
                                    <img src={` ${land.hash}`} alt="" style={{ width: '100%' }} />
                                    <span className="card__span">In need of an Investor</span>
                                </div>
                                <div className="card-int">
                                    <p className="card-int__title">{land.title}, USD {land.price} needed</p>
                                    <p className="excerpt">Country: {land.country}, Soil Type:{land.soilType}</p>
                                    <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            )}
            <div className="pro-container">
                {investlands.map((land, key) => {
                    return (
                        <div className="card" key={key}>
                            <div className="card__corner"></div>
                            <div className="card__img">
                                <img src={`${land.hash}`} alt="" style={{ width: '100%' }} />
                                <span className="card__span">In need of an Investor</span>
                            </div>
                            <div className="card-int">
                                <p className="card-int__title">{land.title}, USD {land.price} needed</p>
                                <p className="excerpt">Country: {land.country}, Soil Type:{land.soilType}</p>
                                <Link to={`/land-details/${land.id}`}><button className="card-int__button">Show</button></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Invest
