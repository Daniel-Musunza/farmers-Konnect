import React from 'react';
import { Link } from 'react-router-dom';

function Home({account}) {
  let user = localStorage.getItem('user' || null);
  return (
    <>
     
      {/* Main Container */}
      <div className="main-container">
        
        {/* Hero Area */}
        <section className="hero" id="hero">
          <div className="swiper slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide hero-image">
                <div className="text">
                  <p>Decentralized Agricultural Platform</p>
                  <h1 style={{ color: 'black' }}>Connects Farmers to Investors and Arable Land</h1>
                  {user ? (
                    <button><Link to="/post-land">Post land</Link></button>
                  ): (
                    <button><Link to="/register">Get started</Link></button>
                  )}
                
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* About Area */}
        <section className="service" id="about">
          <div className="container">
            <div className="s1">
              <div className="data">
                <div className="text">
                  <h1>Get Investors</h1>
                  <p>You don't have enough capital for farming? Get Investors here!</p>
                  <div className="button">
                    <a href="#">readmore<i className="fi fi-sr-angle-small-right"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="s1">
              <div className="data">
                <div className="text">
                  <h1>Rent Arable Land</h1>
                  <p>You want to do farming but you don't have a piece of land? Get some hectares here!</p>
                  <div className="button">
                    <a href="#">readmore<i className="fi fi-sr-angle-small-right"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="s1">
              <div className="data">
                <div className="text">
                  <h1>In-house Loan Service</h1>
                  <p>Access to affordable and timely financing</p>
                  <div className="button">
                    <a href="#">readmore<i className="fi fi-sr-angle-small-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
