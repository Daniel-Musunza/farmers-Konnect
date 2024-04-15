import React from 'react';
import { Link } from 'react-router-dom';

function Home({ account }) {
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
                  ) : (
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
                    <Link to="/invest-details">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
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
                    <Link to="/rent-details">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
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
                    <Link to="/loan-details">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works" id="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>Step 1: Sign up and create your account</h3>
                <p>Get started by registering on our platform and creating your profile.</p>
              </div>
              <div className="step">
                <h3>Step 2: Explore available land listings</h3>
                <p>Browse through our listings to find the perfect agricultural opportunity.</p>
              </div>
              <div className="step">
                <h3>Step 3: Connect with investors or landowners</h3>
                <p>Engage with potential partners to discuss your farming venture.</p>
              </div>
              <div className="step">
                <h3>Step 4: Finalize agreements and begin your agricultural venture</h3>
                <p>Once agreements are in place, start working on your agricultural project.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials" id="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <div className="testimonial">
              <p>"Farmers' Konnect helped me find the perfect land for my farming project. Highly recommended!" - John Doe, Farmer</p>
            </div>
            <div className="testimonial">
              <p>"As an investor, I appreciate the transparency and efficiency of Farmers' Konnect. Great platform!" - Jane Smith, Investor</p>
            </div>
            <div className="testimonial">
              <p>"Thanks to Farmers' Konnect, I was able to monetize my unused land and contribute to sustainable agriculture." - Michael Johnson, Landowner</p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="faqs" id="faqs">
          <div className="container">
            <h2>FAQs</h2>
            <div className="faq">
              <h3>Question 1: How does Farmers' Konnect ensure the security of transactions?</h3>
              <p>Answer: Farmers' Konnect utilizes blockchain technology and smart contracts to ensure secure and transparent transactions.</p>
            </div>
            <div className="faq">
              <h3>Question 2: Can I post multiple land listings on Farmers' Konnect?</h3>
              <p>Answer: Yes, landowners can post multiple listings to maximize their opportunities for connecting with investors.</p>
            </div>
            <div className="faq">
              <h3>Question 3: What types of agricultural ventures are supported on Farmers' Konnect?</h3>
              <p>Answer: Farmers' Konnect supports a wide range of agricultural ventures, including crop farming, livestock rearing, and agroforestry.</p>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2>Contact Us</h2>
            <p>For inquiries or support, reach out to us:</p>
            <ul>
              <li>Email:  <a href="mailto:info@farmerskonnect.org">info@farmerskonnect.org</a></li>
              <li>Phone: <a href="tel:+254703363464"></a>+2547 0336 3464</li>
            </ul>
            <div className="social-media">
              <h3>Follow Us:</h3>
              <ul>
                <li><a href="https://facebook.com/FarmersKonnect">Facebook</a></li>
                <li><a href="https://twitter.com/FarmersKonnect">Twitter</a></li>
                <li><a href="https://instagram.com/FarmersKonnect">Instagram</a></li>
                <li><a href="https://linkedin.com/in/FarmersKonnect">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
