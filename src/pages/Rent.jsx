import { Link } from 'react-router-dom'
function Rent({ lands }) {
    return (
        <div className="main-container">
            <div className="heading">
                <h3>Arable Farming Land For Rent</h3>
            </div>
            <div className="pro-container">
                {lands.map((land, key) => {
                    return (
                        <div className="card" key={key}>
                            <div className="card__corner"></div>
                            <div className="card__img">
                                <img src={`https://turalhasanov.infura-ipfs.io/ipfs/${land.hash}`} alt="" />
                                <span className="card__span">{land.landType}</span>
                            </div>
                            <div className="card-int">
                                <p className="card-int__title">{land.title}, need {land.price}</p>
                                <p className="excerpt">{land.climate}, {land.soilType}</p>
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
