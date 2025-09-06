import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config/apiBase';
import './FAQ.css';

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(`${API_BASE}/content/faqs`);
        const data = await res.json();
        if(!data.success) throw new Error(data.error||'Failed to load FAQs');
        setFaqData(data.faqs.map((f,i)=> ({...f, id: i+1 })));
      } catch(e){ setError(e.message); } finally { setLoading(false);} })();
  },[]);

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
  };

  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="faq-container">
      {/* Hero Section */}
      <section className="relative py-32 pt-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>

        {/* Animated background elements to match Contact hero */}
        <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/15 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="pointer-events-none absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-indigo-400/12 to-purple-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <span className="block text-white mt-2">Questions</span>

            </h1>
            
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Everything you need to know about AI visibility and our services.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="nav-section">
        <div className="nav-container">
          <h2 className="nav-title">Quick Navigation</h2>
          <div className="nav-buttons">
            {['AI Basics', 'Services', 'Implementation', 'Results', 'Pricing', 'Technical'].map((category, index) => (
              <button 
                key={index}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="nav-button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="faq-section">
        <div className="faq-content">
          {loading && <p className="text-center w-full text-white">Loading FAQs...</p>}
          {error && <p className="text-center w-full text-red-400 text-sm">{error}</p>}
          {!loading && !error && faqData.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
            >
              <button 
                type="button"
                className="faq-button"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="faq-question">
                  <span className="question-number">{faq.id}</span>
                  <h3 className="question-text">{faq.question}</h3>
                </div>
                <div className="faq-icon">
                  <span className="icon-plus">{expandedFaq === faq.id ? '−' : '+'}</span>
                </div>
              </button>
              
              {expandedFaq === faq.id && (
                <div className="faq-answer">
                  <div className="answer-content">
                    <span className="answer-icon">A</span>
                    <p className="answer-text">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="resources-section">
        <div className="resources-container">
          <div className="resources-header">
            <h2 className="resources-title">Helpful Resources</h2>
            <p className="resources-subtitle">Dive deeper into AI visibility optimization</p>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon resource-icon-purple">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="resource-title">AI Guide</h3>
              <p className="resource-description">Complete beginner's guide to AI visibility optimization</p>
              <button 
                type="button"
                onClick={() => console.log('AI Guide clicked')}
                className="resource-button"
              >
                Read Guide →
              </button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon resource-icon-pink">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="resource-title">Case Studies</h3>
              <p className="resource-description">See how we've helped businesses improve AI visibility</p>
              <button 
                type="button"
                onClick={() => console.log('Case Studies clicked')}
                className="resource-button"
              >
                View Cases →
              </button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon resource-icon-blue">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="resource-title">Live Chat</h3>
              <p className="resource-description">Chat with our AI visibility experts in real-time</p>
              <button 
                type="button"
                onClick={() => console.log('Live Chat clicked')}
                className="resource-button"
              >
                Start Chat →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section">
        <div className="cta-bg-effects">
          <div className="cta-bg-effect"></div>
        </div>
        
        <div className="cta-content">
          <h2 className="cta-title">Still Have Questions?</h2>
          <p className="cta-subtitle">
            Can't find what you're looking for? Our team is here to help with personalized answers.
          </p>
          <div className="cta-buttons">
            <button 
              type="button"
              onClick={navigateToContact}
              className="cta-button cta-button-primary"
            >
              Contact Us
            </button>
            <button 
              type="button"
              onClick={navigateToHome}
              className="cta-button cta-button-secondary"
            >
              Try Free AI Scan
            </button>
          </div>
  </div>
      </section>
    </div>
  );
};

export default FAQ;