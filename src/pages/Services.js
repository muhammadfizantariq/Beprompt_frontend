import React, { useState } from 'react';

const Services = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const packages = [
    {
      id: 1,
      name: "AI GEO Visibility Report",
      icon: "📊",
      price: "€299",
      period: "one-time",
      description: "A detailed roadmap for improving AI visibility and implementing changes themselves.",
      features: [
        "Full GEO & AEO audit (20+ page PDF)",
        "Technical review: crawlability, meta tags, schema, site speed",
        "Content review: headings, FAQ/Q&A, AI readability",
        "Brand mention check: how AI currently describes your brand",
        "Top 10 detailed recommendations",
        "Step-by-step action plan for DIY improvements"
      ],
      bestFor: "Businesses wanting a detailed roadmap for improving AI visibility and implementing changes themselves.",
      delivery: "Optional monthly retainer: From €250/month – includes re-scans, updated recommendations, and light content adjustments.",
      cta: "Get My Report",
      popular: false,
      highlight: "Perfect starting point",
      gradient: "from-purple-500 to-blue-600"
    },
    {
      id: 2,
      name: "Full GEO Optimization",
      icon: "⚡",
      price: "From €1,500",
      period: "one-time",
      description: "We implement all the recommendations from the report, optimizing your content and technical setup for maximum AI visibility.",
      features: [
        "Everything in the AI GEO Visibility Report, plus:",
        "Technical fixes: meta tags, schema, crawlability settings, sitemap submission",
        "Content optimization: rewrite up to 5 key pages for AI readability",
        "FAQ/Q&A section creation",
        "Basic external mentions list – directories, industry sites, or blogs for brand listings",
        "Before & after AI Findability Score"
      ],
      bestFor: "SMBs that want us to fully implement the improvements.",
      delivery: "Optional monthly retainer: From €350/month – includes continuous scans, content refreshes, and ongoing technical adjustments.",
      cta: "Start Optimization",
      popular: true,
      highlight: "Most popular choice",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      id: 3,
      name: "Premium GEO Setup",
      icon: "👑",
      price: "From €2,500",
      period: "one-time",
      description: "A complete, high-impact GEO overhaul from the start.",
      features: [
        "Everything in Full GEO Optimization, plus:",
        "Extended content optimization: rewrite up to 10 key pages",
        "Advanced external mentions list with tailored outreach suggestions",
        "In-depth competitor AI visibility comparison",
        "Enhanced technical setup – deeper schema, structured Q&A, knowledge panel optimization guidance"
      ],
      bestFor: "Businesses needing a complete, high-impact GEO overhaul from the start.",
      delivery: "Optional monthly retainer: From €500/month – includes monthly scans, trend-based strategy updates, new content creation, and ongoing link/mention building.",
      cta: "Contact Sales",
      popular: false,
      highlight: "Enterprise solution",
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  const freeAudit = {
    name: "Free Quick AI GEO Scan",
    icon: "🔍",
    price: "Always free",
    description: "Give immediate value, highlight opportunities, and invite users to explore full solutions.",
    features: [
      "AI Findability Score (0–100)",
      "2–3 high-level improvement tips",
      "Email copy of results"
    ],
    cta: "Try Free Scan",
    highlight: "Start here - No cost",
    gradient: "from-green-500 to-blue-500"
  };

  const comparisonData = [
    { feature: "AI Visibility Score", free: "Basic", report: "Detailed", optimization: "Detailed + Implementation", premium: "Detailed + Ongoing" },
    { feature: "Content Analysis", free: "✓", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Technical Analysis", free: "✓", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Detailed Recommendations", free: "✗", report: "✓", optimization: "✓", premium: "✓" },
    { feature: "Content Optimization", free: "✗", report: "✗", optimization: "✓", premium: "✓" },
    { feature: "Technical Implementation", free: "✗", report: "✗", optimization: "✓", premium: "✓" },
    { feature: "Ongoing Support", free: "✗", report: "30 days", optimization: "3 months", premium: "Ongoing" },
    { feature: "Strategy Calls", free: "✗", report: "✗", optimization: "✗", premium: "Quarterly" },
    { feature: "Custom Solutions", free: "✗", report: "✗", optimization: "✗", premium: "✓" }
  ];

  const proceedToCheckout = () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setTimeout(() => {
      if (token) {
        window.location.href = '/checkout';
      } else {
  // Pass intent so login page redirects back to checkout after auth
  window.location.href = '/login?from=checkout';
      }
    }, 50);
  };

  // Handle card click: first package goes straight to checkout (no modal)
  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg); // Always open modal for explicit confirmation
  };

  return (
    <div className="min-h-screen relative">
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-white text-lg font-medium">Preparing checkout...</p>
          </div>
        </div>
      )}
      {/* Hero Section - FIXED: Added pt-32 for header spacing and increased height */}
      <section className="relative py-32 pt-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/25 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-br from-indigo-400/15 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/25 rounded-full blur-xl animate-pulse delay-1500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                GEO Service Packages
              </span>
              <span className="block text-white mt-2">& Pricing</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Generative Engine Optimization (GEO) – the key to AI visibility. 
              We help businesses become the answer in AI assistants like ChatGPT, Gemini, Claude, Perplexity, and Bing AI.
            </p>
          </div>
        </div>
      </section>

      {/* Free Audit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Here - Completely Free</h2>
            <p className="text-lg text-gray-600">Get instant insights into your AI visibility</p>
          </div>
          
          <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 lg:p-12 border-2 border-green-200 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                {freeAudit.highlight}
              </span>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{freeAudit.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{freeAudit.name}</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                {freeAudit.price}
              </div>
              <p className="text-gray-700 mb-6">{freeAudit.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What you get:</h4>
                <ul className="space-y-3">
                  {freeAudit.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <a 
                  href="/" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  {freeAudit.cta}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="text-sm text-gray-500 mt-3">No credit card required • Takes 30 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paid Packages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Paid Packages</h2>
            <p className="text-xl text-gray-600">Choose the level of support that's right for your business</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                  pkg.popular ? 'border-purple-300 transform scale-105' : 'border-gray-200'
                }`}
                onClick={() => handleCardClick(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {pkg.highlight}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent mb-2`}>
                    {pkg.price}
                  </div>
                  <div className="text-gray-500 text-sm">{pkg.period}</div>
                </div>
                
                <p className="text-gray-600 mb-6 text-center">{pkg.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-sm text-gray-500 italic">+ {pkg.features.length - 4} more features</li>
                    )}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Best for:</span>
                    <span className="text-gray-600 ml-1">{pkg.bestFor}</span>
                  </div>
                  
                  <button
                    className={`w-full py-3 px-6 bg-gradient-to-r ${pkg.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    onClick={(e)=> { e.stopPropagation(); setSelectedPackage(pkg); }}
                  >
                    {pkg.id === 1 ? 'View & Purchase Report' : pkg.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Comparison</h2>
            <p className="text-lg text-gray-600">See exactly what's included in each package</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Free Scan</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">AI Report</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Optimization</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.free}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.report}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.optimization}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Choose Your Package</h2>
            <p className="text-lg text-gray-600">Not sure which package is right for you? Here's our guide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Start with Free Scan", desc: "Just curious about AI visibility? Get instant insights in 30 seconds.", cta: "Try Free Scan", link: "/" },
              { title: "Get the Report", desc: "Want detailed analysis and a clear roadmap? Perfect for DIY implementation.", cta: "Get Report", action: () => setSelectedPackage(packages[0]) },
              { title: "Full Optimization", desc: "Ready for us to handle everything? We'll implement all improvements.", cta: "Start Optimization", action: () => setSelectedPackage(packages[1]) },
              { title: "Ongoing Partnership", desc: "Need continuous support? Get a dedicated AI strategist.", cta: "Contact Sales", action: () => setSelectedPackage(packages[2]) }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{item.desc}</p>
                {item.link ? (
                  <a href={item.link} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
                    {item.cta}
                  </a>
                ) : (
                  <button onClick={item.action} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
                    {item.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Join hundreds of businesses that are already being found by AI assistants.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Try Free AI Scan
            </a>
            <a href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Package Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPackage(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6">
              <button 
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                onClick={() => setSelectedPackage(null)}
              >
                ×
              </button>
              <div className="text-center">
                <div className="text-5xl mb-4">{selectedPackage.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPackage.name}</h2>
                <div className={`text-3xl font-bold bg-gradient-to-r ${selectedPackage.gradient} bg-clip-text text-transparent mb-2`}>
                  {selectedPackage.price}
                </div>
                <div className="text-gray-500">{selectedPackage.period}</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">{selectedPackage.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4 mb-6">
                <div><strong className="text-gray-900">Best for:</strong> <span className="text-gray-700">{selectedPackage.bestFor}</span></div>
                <div><strong className="text-gray-900">Delivery:</strong> <span className="text-gray-700">{selectedPackage.delivery}</span></div>
              </div>
              
              <div className="space-y-3">
                <button className={`w-full py-3 px-6 bg-gradient-to-r ${selectedPackage.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`} onClick={proceedToCheckout}>
                  {selectedPackage.id === 1 ? 'Proceed to Checkout' : selectedPackage.cta}
                </button>
                <button className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition" onClick={()=> setSelectedPackage(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;