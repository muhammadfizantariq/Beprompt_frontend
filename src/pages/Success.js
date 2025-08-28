import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Success.css';

export default function Success() {
  const [status, setStatus] = useState('pending');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    // Get email and url from query params
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const url = params.get('url');
    
    console.log('Success page params:', { email, url });
    setDebugInfo(`Email: ${email}, URL: ${url}`);
    
    if (email && url) {
      console.log('Calling analyze endpoint...');
      
      // Add a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        setDebugInfo('Timeout: Analysis request is taking too long');
        setStatus('success'); // Show success anyway since payment was completed
      }, 10000); // 10 second timeout
      
      // Trigger the analysis report generation
      axios.post('http://localhost:5000/analyze', { email, url })
        .then((response) => {
          clearTimeout(timeout);
          console.log('Analyze response:', response);
          setStatus('success');
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error('Analyze error:', error);
          setDebugInfo(`Error: ${error.message}`);
          // Still show success since payment was completed, just log the analysis error
          setStatus('success');
        });
    } else {
      console.log('Missing email or url params');
      setStatus('error');
    }
  }, []);

  return (
    <div className="success">
      <div className="container">
        <div className="success-content">
          {status === 'pending' && (
            <div className="success-card processing">
              <div className="success-icon">
                <div className="spinner-large"></div>
              </div>
              <h1>Processing Your Order...</h1>
              <p>We're setting up your AI GEO Visibility Report analysis.</p>
              <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                Debug: {debugInfo}
              </p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="success-card completed">
              <div className="success-icon">✅</div>
              <h1>Payment Successful!</h1>
              <p className="success-message">
                Your AI GEO Visibility Report will be delivered to your email within 1 day.
              </p>
              
              <div className="delivery-info">
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <div>
                    <strong>Report Delivery</strong>
                    <p>Check your email inbox for the comprehensive analysis</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📊</span>
                  <div>
                    <strong>What You'll Receive</strong>
                    <p>20+ page PDF with detailed GEO recommendations</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">⚡</span>
                  <div>
                    <strong>Processing Started</strong>
                    <p>Your analysis has been queued and will begin shortly</p>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
                OK - Return to Home
              </button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="success-card error">
              <div className="success-icon">❌</div>
              <h1>Something Went Wrong</h1>
              <p>We could not process your request. Please contact our support team.</p>
              <a href="/" className="btn btn-primary">Return Home</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
