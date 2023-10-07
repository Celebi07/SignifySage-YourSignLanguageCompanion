import React, { useState } from "react";
import './App.css'
import './components/FeedbackForm'
import FeedbackForm from "./components/FeedbackForm";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import MainContent from "./components/MainContent";
import backgroundVideo from './bg_vid.mp4';
const Cam = () => {
return (
  <div>
   <Navbar/>
   <Header/>

   {/* <h1 className="header">SignifySage</h1> */}
   <img
    src="http://localhost:5003/video_feed"
    alt="Video"
    className="cam-video"
   />
   <p className="quote">
        "In the graceful dance of hands, we find the language of the heart. For the Deaf community, sign language is more than words; it's the bridge to understanding, the key to connection, and the melody of belonging."
   </p>
   <div className="video-container">
        <video autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          {/* Add additional source elements for different video formats if needed */}
        </video>
      </div>
   {/* <FeedbackForm/> */}
   {/* <AboutMe/> */}
   <MainContent/>
   <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: kashishgarg89.5@gmail.com</p>
          <p>Phone: 8076347880</p>
        </div>
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} SignifySage. All rights reserved.
      </div>
    </footer>
  </div>
 );
};
export default Cam;