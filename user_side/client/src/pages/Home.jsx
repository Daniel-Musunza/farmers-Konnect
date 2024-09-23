import React from 'react';
import { Link } from 'react-router-dom';

function Home({ account }) {
  let user = localStorage.getItem('user' || null);
  return (
    <>

      {/* Main Container */}
      <div className='main-container'>
        <section className="hero" id="hero top" >
          <div className="swiper slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide hero-image">
                <div className="text">
                  <p>Decentralized Agricultural Platform </p>
                  <h1 style={{ color: '#fff' }}>🌱 Transforming Farming through contract Farming for Oil crops 🌱</h1>
                  <div className="right-data" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    {user ? (

                      <Link to="/post-land#top" className='button'> Post land </Link>

                    ) : (
                      <Link to="/register" className='button'>Get started</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* About Area */}
        <section className="service" id="about">
          <div className="container">
            <div className="s1">
              <Link to="/loan-details#top">
                <div className="data">
                  <div className="text">
                    <h1>Contract farming</h1>
                    <p>Secure your market with premium quality, expert support, and guaranteed growth.</p>

                    <div className="button">
                      <Link to="/contract-details#top">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="s1">
              <Link to="/invest-details#top">
                <div className="data">
                  <div className="text">
                    <h1>Get Investors</h1>
                    <p>You don't have enough capital for farming? Get Investors here!</p>
                    <div className="button">
                      <Link to="/invest-details#top">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="s1">
              <Link to="/rent-details#top">
                <div className="data">
                  <div className="text">
                    <h1>Rent Arable Land</h1>
                    <p>You want to do farming but you don't have a piece of land? Get some hectares here!</p>
                    <div className="button">
                      <Link to="/rent-details#top">readmore<i className="fi fi-sr-angle-small-right"></i></Link>
                    </div>
                  </div>
                </div>
              </Link>
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
        {/* <section className="testimonials" id="testimonials">
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
        </section> */}

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
              <p>Answer: Farmers' Konnect exclusively supports oil crop farming, including crops like canola and sunflower.</p>
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
                <li><a href="https://www.linkedin.com/company/farmers-konnect">LinkedIn</a></li>
                <li><a href=" https://youtube.com/@FKonnect?si=vko_q7Uh4zUFsc1b">Youtube</a></li>

              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Team</h2>
          <div className="team">
            <div className="team-member">
              <img src="img/omar.jpg" alt=""
                style={{
                  width: '100px',
                  height: '100px', // Ensure the height matches the width for a perfect circle
                  marginRight: '20px',
                  borderRadius: '50%', // Make it circular
                  cursor: 'pointer',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                }} />
              <div className='team-details'>
                <h3>Kelvin Omari</h3>
                <h5>Founder | CEO </h5>
                <p>I'm a versatile business professional specializing in agriculture, with extensive experience spanning education, project leadership, and various roles in the tech industry. As CEO and Founder of Farmers'Konnect, I'm dedicated to establishing our company as a leading African entity and making a meaningful impact in the agriculture sector.</p>
              </div>

            </div>
            <div className="team-member">
              <img src="img/profile.jpg" alt=""
                style={{
                  width: '100px',
                  height: '100px', // Ensure the height matches the width for a perfect circle
                  marginRight: '20px',
                  borderRadius: '50%', // Make it circular
                  cursor: 'pointer',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                }} />
              <div className='team-details'>
                <h3>Musunza Festus</h3>
                <h5>Co-founder | Software Engineer </h5>
                <p>I am a seasoned software engineer with a strong background in full-stack development, backend systems, web design and development. Passionate about creating innovative solutions and driving projects from conception to delivery.</p>
              </div>
            </div>
            <div className="team-member">
              <img src="img/boston.jpg" alt=""
                style={{
                  width: '100px',
                  height: '100px', // Ensure the height matches the width for a perfect circle
                  marginRight: '20px',
                  borderRadius: '50%', // Make it circular
                  cursor: 'pointer',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                }} />
              <div className='team-details'>
                <h3>Boston </h3>
                <h5>CTO</h5>
                <p>I major in Software Engineering, Cyber Threat Intelligence, Linux System Administration, Windows Server, Networking, Mobile Security, Reverse Engineering, Penetration Testing, Vulnerability Assessment, Red Team and Log management to ensure a safe secure Cyberspace for the entire community.
                </p>
              </div>
            </div>
            <div className="team-member">
              <img src="img/morris.jpg" alt=""
                style={{
                  width: '100px',
                  height: '100px', // Ensure the height matches the width for a perfect circle
                  marginRight: '20px',
                  borderRadius: '50%', // Make it circular
                  cursor: 'pointer',
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire area
                }} />
              <div className='team-details'>
                <h3>Morris </h3>
                <h5>Blockchain Developer</h5>
                <p>I'm a versatile programmer skilled in Python, JavaScript, TypeScript, Rust, Solidity, Java, and Motoko, proficient in both web 2.0 and web 3.0 technologies. Specializing in React, Node.js, GraphQL, and Motoko, I'm dedicated to creating innovative web applications and decentralized apps while prioritizing user experience and actively contributing to the tech community.</p>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}

export default Home;
