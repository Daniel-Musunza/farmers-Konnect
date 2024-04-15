import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ account }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [chain, setChain] = useState(localStorage.getItem('chain'));
  let user = localStorage.getItem('user' || null);

  useEffect(() => {
  }, [user])

  const setUser = () => {
    // Assuming you have user data to set, replace this with your actual user object
    const user = {
      account: account
    };

    // Save user to local storage
    localStorage.setItem('user', JSON.stringify(user));
  };
  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleChainChange = (value) => {
    setChain(value);
    localStorage.setItem('chain', value)
  }
  // const getCurrentUser = async() =>{
  //   const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);
  //   const userSnapshot = await getDoc(userRef);
  //   if (userSnapshot.exists()) {
  //     const userData = userSnapshot.data();
  //     localStorage.setItem('user', JSON.stringify(userData));
  //   }
  // }


  return (

    <section className="header" id="header" style={{ backgroundColor: 'green' }}>
      <div className="container container1">
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }} className="logo">
          <Link to="/"><img src="img/logo.png" alt="" width="50px" /></Link>
          <h3 style={{ paddingLeft: '5px' }}>Farmers' Konnect</h3>
        </div>
        <nav>
          <div className="navbar">
            <Link to="/" style={{ color: '#fff' }}>home</Link>
            <Link to="/invest" style={{ color: '#fff' }}>Farm To Invest</Link>
            <Link to="/rent" style={{ color: '#fff' }}>Land For Rent</Link>
            {user ? (
              <Link to="/post-land"
                style={{
                  color: '#fff'
                }}>
                post Land
              </Link>
            ) : (
              <></>
              // <button style={{color: 'red'}}> <a href="https://metamask.io/download/" >connect to metamask </a></button>
            )}
          </div>
          
          <div className="right-data">
            {isMobileMenuOpen ? (
              <i className="fa-regular fa-circle-xmark" id="menu" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMobileMenu}></i>
            ) : (
              <i className="fa-solid fa-bars" id="menu" style={{ color: '#fff', fontSize: '40px', marginRight: '20px' }} onClick={toggleMobileMenu}></i>
            )}

            <select
              name="web-version"
              id="web-version"
              className='select-for-bg'
              style={{
                borderRadius: '5px',
                padding: '5px',
                border: 'none',
                backgroundColor: 'green',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                textTransform: 'uppercase'
              }}
              onChange={(e) => handleChainChange(e.target.value)}
            >
              <option value="web2" style={{ height: '40px' }}>Offchain(Web2.0)</option>
              <option value="web3" style={{ height: '40px' }}>Onchain(Blockchain)</option>
            </select>
            {chain === 'web3' ? (
              <>
                {account ? (
                  <></>
                ) : (

                  <a href="https://metamask.io/download/"  className="select-for-bg button" > <span style={{fontSize: '10px'}}>connect to metamask</span></a>

                )}
              </>
            ) : (
              <div className='select-for-bg' >
                {user ? (
                  <>
                    <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}  className="select-for-bg button">Log Out</button>
                  </>
                ) : (
                  <div style={{display: 'flex'}}>
                  
                      <Link to="/login"  className='link button' style={{zIndex: 1000}}> <span> Log In</span></Link>
                     <Link to="/register"  className='link button' style={{marginLeft: '-30px'}}><span style={{marginLeft: '30px'}}>  Register</span></Link>
                  </div>

                )}
              </div>
            )}





          </div>
        </nav>
      </div>
      <div className="account">
        <h3>Account:
          {account ? (
            <span>{account}</span>
          ) : (
            <span>Not connected</span>
          )}
        </h3>
      </div>
      {isMobileMenuOpen && (
        <div className='mobile-menu'>
          <Link to="/" style={{ color: '#fff' }} className='link'>home</Link>
          <br />
          <hr />
          <Link to="/invest" style={{ color: '#fff' }} className='link'>Farm To Invest</Link>
          <br />
          <hr />
          <Link to="/rent" style={{ color: '#fff' }} className='link'>Land For Rent</Link>
          <br />

          <hr />
          {account ? (
          <Link to="/post-land">post Land</Link>
          ) : (
            <></>
            // <button style={{color: 'red'}}> <a href="https://metamask.io/download/" >Metamask </a></button>
          )}
          <select
              name="web-version"
              id="web-version"
              style={{
                borderRadius: '5px',
                padding: '5px',
                border: 'none',
                backgroundColor: 'green',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                textTransform: 'uppercase'
              }}
              onChange={(e) => handleChainChange(e.target.value)}
            >
              <option value="web2" style={{ height: '40px' }}>Offchain(Web2.0)</option>
              <option value="web3" style={{ height: '40px' }}>Onchain(Blockchain)</option>
            </select>
            {chain === 'web3' ? (
              <>
                {account ? (
                  <></>
                ) : (

                  <Link to="https://metamask.io/download/" className='btn' >connect to metamask</Link>

                )}
              </>
            ) : (
              <>
                {user ? (
                  <>
                    <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className='btn'>Log Out</button>
                  </>
                ) : (
                  <>
                      <Link to="/login" className='link'>Log In</Link>
                  <Link to="/register" className='link'>Register</Link>
                  </>

                )}
              </>
            )}

        </div>
      )}

    </section>
  )
}

export default Header
