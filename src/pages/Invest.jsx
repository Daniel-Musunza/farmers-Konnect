import { Link } from 'react-router-dom'

function Invest({lands}) {
    const investlands = lands.filter((land) => land.landType=='invest');
    return (
        <div className="main-container">
            <div className="heading">
                <h3>Farms waiting for you to invest in</h3>
            </div>
            <div className="pro-container">
                <div className="card">
                    <div className="card__corner"></div>
                    <div className="card__img">
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <span className="card__span">In need of an Investor</span>
                    </div>
                    <div className="card-int">
                        <p className="card-int__title">5 hectares in Kikuyu, Kenya</p>
                        <p className="excerpt">It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.</p>
                        <Link to="/land-details/1"><button className="card-int__button">Show</button></Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card__corner"></div>
                    <div className="card__img">
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <span className="card__span">In need of an Investor</span>
                    </div>
                    <div className="card-int">
                        <p className="card-int__title">5 hectares in Kikuyu, Kenya</p>
                        <p className="excerpt">It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.</p>
                        <Link to={`/land-details/${1}`}><button className="card-int__button">Show</button></Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card__corner"></div>
                    <div className="card__img">
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <span className="card__span">In need of an Investor</span>
                    </div>
                    <div className="card-int">
                        <p className="card-int__title">5 hectares in Kikuyu, Kenya</p>
                        <p className="excerpt">It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.</p>
                        <Link to="/land-details/1"><button className="card-int__button">Show</button></Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card__corner"></div>
                    <div className="card__img">
                        <img src="img/kikuyu-land.jpg" alt="" />
                        <span className="card__span">In need of an Investor</span>
                    </div>
                    <div className="card-int">
                        <p className="card-int__title">5 hectares in Kikuyu, Kenya</p>
                        <p className="excerpt">It is suitable for growing a range of crops, including tea, coffee, horticultural produce like avocados and strawberries, as well as staple crops such as maize and wheat, while also supporting livestock farming.</p>
                        <Link to="/land-details/1"><button className="card-int__button">Show</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invest
