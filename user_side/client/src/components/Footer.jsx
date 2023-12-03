import { Link } from 'react-router-dom'

function Footer() {
  return (

    <section className="footer" id="footer">
      <div className="container">
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }} className="logo">
          <Link to="/"><img src="img/logo.png" alt="" width="50px" /></Link>
          <h3 style={{ paddingLeft: '5px' }}>Farmers' Konnect</h3>
        </div>
        <div className="navbar">
          <nav>
            <Link to="/" style={{ color: '#fff' }}>home</Link>
            <Link to="/invest" style={{ color: '#fff' }}>Farm To Invest</Link>
            <Link to="/rent" style={{ color: '#fff' }}>Land For Rent</Link>
          </nav>
        </div>
        <div className="search">
          <h1>Subscribe to the<br />newsletter</h1>
          <div className="input">
            <input type="email" name="email" id="email" placeholder="email" />
            <i class="fa-solid fa-square-arrow-up-right"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
