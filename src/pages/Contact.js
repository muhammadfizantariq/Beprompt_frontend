import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = {
    email: "hello@beprompted.io",
    phone: "+1 (555) 123-4567",
    address: "123 AI Street, Tech City, TC 12345",
    officeHours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    responseTime: "We typically respond within 2-4 hours during business hours"
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us a detailed message about your AI visibility needs",
      action: "hello@beprompted.io",
      link: "mailto:hello@beprompted.io",
      gradient: "from-purple-500 to-blue-600"
    },
    {
      icon: "📞",
      title: "Call Sales",
      description: "Speak directly with our AI visibility experts",
      action: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      icon: "📅",
      title: "Schedule Consultation",
      description: "Book a 30-minute consultation call with our team",
      action: "Book Now",
      link: "https://calendly.com/beprompted/consultation",
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        business: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 pt-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
        
        {/* Animated background elements */}
        <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/15 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="pointer-events-none absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-indigo-400/12 to-purple-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Have questions about AI visibility? Need a custom quote? Our friendly, expert team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600">Choose the best way to reach us based on your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${method.gradient} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 text-2xl`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <a 
                  href={method.link} 
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${method.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  {method.action}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
  <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-purple-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-lg text-gray-600">
                Tell us about your business and AI visibility goals. We'll get back to you within 2-4 hours with personalized recommendations.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Tell us about your business, current AI visibility challenges, and what you'd like to achieve. We're here to help!"
                  required
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                ></textarea>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
            
            {submitStatus === 'success' && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                </div>
                <p className="text-green-700">
                  We'll get back to you within 2-4 hours during business hours with personalized recommendations for your AI visibility needs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600">Reach out to our friendly, expert team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                📧
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-3">For general inquiries and support</p>
              <a href={`mailto:${contactInfo.email}`} className="text-purple-600 hover:text-purple-700 font-medium">
                {contactInfo.email}
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                📞
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-sm text-gray-600 mb-3">For sales and urgent inquiries</p>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-purple-600 hover:text-purple-700 font-medium">
                {contactInfo.phone}
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                📍
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
              <p className="text-sm text-gray-600 mb-3">Our headquarters</p>
              <span className="text-gray-700">{contactInfo.address}</span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                🕒
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-sm text-gray-600 mb-3">When we're available</p>
              <span className="text-gray-700">{contactInfo.officeHours}</span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 mb-3">How quickly we'll get back to you</p>
              <span className="text-gray-700">{contactInfo.responseTime}</span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">
                💬
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Solutions</h3>
              <p className="text-sm text-gray-600 mb-3">Need something specific?</p>
              <span className="text-gray-700">We create custom AI visibility solutions for businesses with unique needs.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Improve Your AI Visibility?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses that are already being found by AI assistants. Our expert team is ready to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Try Free AI Scan
            </a>
            <a 
              href="/services" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              View Services
            </a>
            <a 
              href="https://calendly.com/beprompted/consultation" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;