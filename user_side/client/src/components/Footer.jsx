import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';

function Footer() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {

      const subscriptionsCollectionRef = collection(db, "subscriptions");
      const subscriptionRef = doc(subscriptionsCollectionRef, email);

      await setDoc(subscriptionRef, {
        email: email
      });

      setLoading(false);
      toast.success("You have subscribed successfully.");

    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("An error occurred while subscribing.");
    }
  };
  return (

    <section className="footer" id="footer">
      <div className="container container1">
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }} className="logo">
          <Link to="/#top"><img src="img/logo.png" alt="" width="50px" /></Link>
          <h3 style={{ paddingLeft: '5px' }}>Farmers' Konnect</h3>
        </div>
        <div className="navbar" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/#top" style={{ color: '#fff' }}>home</Link>
            <Link to="/invest#top" style={{ color: '#fff' }}>Farm To Invest</Link>
            <Link to="/rent#top" style={{ color: '#fff' }}>Land For Rent</Link>
          </nav>
          <nav className='second-nav'>
            <Link to="/invest-details#top" style={{ color: '#fff' }}>Investment details</Link>
            <Link to="/rent-details#top" style={{ color: '#fff' }}>Rental land Details</Link>
            <Link to="/loan-details#top" style={{ color: '#fff' }}>Loan Details</Link>
          </nav>
        </div>
        <div className="search">
          <h1>Subscribe to the<br />newsletter</h1>

          <div className="input">
            {loading ? (
              <h2>Subscribing...</h2>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i class="fa-solid fa-square-arrow-up-right" onClick={handleSubmit}></i>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
