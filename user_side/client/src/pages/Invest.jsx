import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { countries as countriesList } from 'countries-list';

const mycountries = Object.values(countriesList);

function Invest({ contract, account }) {
    const [lands, setLands] = useState(
        [
            {
                id: '1',
                hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmbyG33fUQbM1APeComix1uN9VQBdKtRHYJsX51M59gcKi?_gl=1*kq9a1f*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM0Nzg4Mi4xLjEuMTcwMTM0ODI2Mi4yNS4wLjA.',
                title: 'Arable Land In Kikuyu.',
                landType: 'invest',
                price: '2000',
                country: 'Kenya',
                soilType: 'Loom',
                landDetails: ''
            },
            {
                id: '2',
                hash: 'https://magenta-efficient-centipede-68.mypinata.cloud/ipfs/QmZvfb4fjrSM59tsf8JYKwys6WFgRt28m2D2Dy9F2J87LT?_gl=1*1yf5ise*_ga*MTc0NTY4NDgzNi4xNzAxMzQ3ODcz*_ga_5RMPXG14TE*MTcwMTM1NjQyOS4zLjAuMTcwMTM1NjQyOS42MC4wLjA.',
                title: 'Arable Land For Farming Ocra',
                landType: 'invest',
                price: '5000',
                country: 'Albania',
                soilType: 'Loose Sand',
                landDetails: ''
            }
        ] && JSON.parse(localStorage.getItem('lands')) );
    const [filteredInvestmentLands, setFilteredInvestmentLand] = useState([]);
    const [selectingCountry, setSelectingCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

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
            } catch (error) {
                console.error('Error fetching lands:', error);
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

    return (
        <div className="main-container">
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
                                <div className="card__corner"></div>
                                <div className="card__img">
                                    <img src={` ${land.hash.substring(6)}`} alt="" style={{ width: '100%' }} />
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
                                <img src={`${land.hash.substring(6)}`} alt="" style={{ width: '100%' }} />
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
