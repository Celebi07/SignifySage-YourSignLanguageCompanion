import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <h2>About Me</h2>
        <p>
          Hello! I'm Kashish Garg, a passionate developer and data enthusiast. I
          enjoy exploring new technologies and working on exciting projects.
          Here are some of my interests and links:
        </p>
        <ul>
          <li>
            <a href="https://github.com/Celebi07" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.kaggle.com/celebi07" target="_blank" rel="noopener noreferrer">
              Kaggle
            </a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}

export default AboutMe;
