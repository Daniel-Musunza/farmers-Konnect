import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Header({account}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <section className="header" id="header" style={{ backgroundColor: 'green' }}>
      <div className="container">
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }} className="logo">
          <Link to="/"><img src="img/logo.png" alt="" width="50px" /></Link>
          <h3 style={{ paddingLeft: '5px' }}>Farmers' Konnect</h3>
        </div>
        <nav>
          <div className="navbar">
            <Link to="/" style={{ color: '#fff' }}>home</Link>
            <Link to="/invest" style={{ color: '#fff' }}>Farm To Invest</Link>
            <Link to="/rent" style={{ color: '#fff' }}>Land For Rent</Link>
          </div>
          <div className="right-data">
          {isMobileMenuOpen ? (
            <i className="fa-regular fa-circle-xmark" id="menu" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMobileMenu}></i>
          ):(
            <i className="fa-solid fa-bars" id="menu" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMobileMenu}></i>
          )}
            <button><Link to="/post-land">Get Started</Link></button>
          </div>
        </nav>
      </div>
      <div className="account">
        <h3>Account: 
          {account?(
            <span>{account}</span>
          ): (
              <span>Not connected</span>
          )}
          </h3>
      </div>
      {isMobileMenuOpen && (
        <div className='mobile-menu' onClick={toggleMobileMenu}>
          <Link to="/" style={{ color: '#fff' }} className='link'>home</Link>
          <br />
          <hr />
          <Link to="/invest" style={{ color: '#fff' }} className='link'>Farm To Invest</Link>
          <br />
          <hr />
          <Link to="/rent" style={{ color: '#fff' }} className='link'>Land For Rent</Link>
          <br />
          <hr />
        </div>
      )}
    </section>
  )
}

export default Header
