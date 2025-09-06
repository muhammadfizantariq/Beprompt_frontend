import React, { useState, useEffect } from 'react';
import { createCheckoutSession, precheckUrl } from '../api';
import './Checkout.css';

export default function Checkout() {
  const [form, setForm] = useState({ url: '', email: '', name: '' });
  const [lockedEmail, setLockedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // On mount, attempt to read JWT and prefill email
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if(token){
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userEmail = payload.email || payload.userEmail;
        if(userEmail){
          setForm(f => ({ ...f, email: userEmail }));
          setLockedEmail(true);
        }
      }
    } catch {/* ignore */}
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1) Normalize and verify the URL like Home page does
      const pre = await precheckUrl(form.url);
      if (!pre?.success) {
        setError(pre?.error || 'We couldn’t validate that URL. Please check and try again.');
        setLoading(false);
        return;
      }

      const normalizedUrl = pre.finalUrl || pre.normalizedUrl || form.url;

      // 2) Proceed to create checkout session with normalized URL
      const res = await createCheckoutSession({ ...form, url: normalizedUrl });
      window.location.href = res.url;
    } catch (err) {
      setError('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  // Removed unused handler to satisfy linter

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
      placeholder="Enter your website URL" 
                  value={form.url}
                  onChange={handleChange} 
      inputMode="url"
      autoComplete="url"
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
                  disabled={lockedEmail}
                  title={lockedEmail? 'Using your account email' : 'Enter the email to receive the report'}
                />
                {lockedEmail && <small style={{color:'#bbb'}}>Using logged in account email</small>}
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
