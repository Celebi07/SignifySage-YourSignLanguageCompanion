import React, { useState } from 'react';
import './FeedbackForm.css'; // Import your CSS file for styling

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the feedback to your server or handle it as needed.
    // For simplicity, we'll just set a flag to indicate submission.
    setSubmitted(true);
  };

  return (
    <div className="feedback-form">
      <h2 className="feedback-text">Feedback Form</h2>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="text-input"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
