import React, { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

export default function Checkout() {
  const [form, setForm] = useState({ url: '', email: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/create-checkout-session', {
        ...form,
        amount: 29900, // $299 in cents
        quantity: 1,
      });
      
      // Redirect to Stripe for payment processing
      window.location.href = res.data.url;
      
    } catch (err) {
      setError('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  const handleOkClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-content">
          <div className="checkout-header">
            <h1>Complete Your Purchase</h1>
            <p className="checkout-subtitle">Get your comprehensive AI GEO Visibility Report</p>
          </div>
          
          <div className="checkout-card">
            <div className="product-summary">
              <div className="product-icon">📊</div>
              <div className="product-details">
                <h3>AI GEO Visibility Report</h3>
                <p>Complete analysis with actionable recommendations</p>
                <div className="price">$299 <span className="price-note">one-time payment</span></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Website URL</label>
                <input 
                  name="url" 
                  placeholder="https://yourwebsite.com" 
                  value={form.url}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Business Email</label>
                <input 
                  name="email" 
                  type="email"
                  placeholder="your@business.com" 
                  value={form.email}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  name="name" 
                  placeholder="Your Business Name" 
                  value={form.name}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    🔒 Secure Checkout - $299
                  </>
                )}
              </button>
              
              {error && <div className="error-message">{error}</div>}
            </form>

            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">📧</span>
                <span>Report via Email</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span>24-48hr Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
