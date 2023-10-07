import React from 'react';
import FeedbackForm from './FeedbackForm';
import AboutMe from './AboutMe';
import './MainContent.css';

function MainContent() {
  return (
    <div className="main-content">
      <FeedbackForm />
      <AboutMe />
    </div>
  );
}

export default MainContent;
