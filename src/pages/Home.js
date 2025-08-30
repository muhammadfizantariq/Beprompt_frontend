import React, { useState } from 'react';
import { runQuickScan } from '../api';
import ScanResultsModal from '../components/ScanResultsModal';

const MainScreen = () => {
 const [scanData, setScanData] = useState({
   websiteUrl: '',
   email: ''
 });
 const [isScanning, setIsScanning] = useState(false);
 const [error, setError] = useState('');
const [showResultsModal, setShowResultsModal] = useState(false);
const [scanResult, setScanResult] = useState(null);

 const handleInputChange = (e) => {
   setScanData({
     ...scanData,
     [e.target.name]: e.target.value
   });
 };
 const navigateToServices = () => {
  window.location.href = '/services';
};

const navigateToContact = () => {
  window.location.href = '/contact';
};
 const handleCloseModal = () => {
  setShowResultsModal(false);
  setScanResult(null);
  setScanData({
    websiteUrl: '',
    email: ''
  });
};

const handleScanSubmit = async (e) => {
  e.preventDefault();
  setIsScanning(true);
  setError('');

  try {
    // REPLACE THE TRY BLOCK WITH THIS:
    const response = await runQuickScan(scanData.websiteUrl, scanData.email);
    if (response && response.success) {
      setScanResult({
        url: response.data?.url,
        score: response.data?.finalScore,
        summary: response.data?.summary,
        recommendations: response.data?.recommendations || [],
        email: scanData.email,
      });
      setShowResultsModal(true);
    } else {
      throw new Error(response?.error || 'Scan failed');
    }
  } catch (err) {
    setError('Failed to run scan. Please try again.');
    console.error('Scan error:', err);
  } finally {
    setIsScanning(false);
  }
};

 return (
   <div className="min-h-screen">
     {/* HERO SECTION */}
     <div className="relative min-h-screen overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-purple-950 via-blue-950 to-blue-900">
         <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/15 via-transparent to-cyan-600/8"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,127,0.12),transparent_50%)] opacity-60"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_50%)] opacity-60"></div>
       </div>

       {/* Animated geometric shapes */}
       <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-red-500/15 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
       <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-400/12 to-red-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
       <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-500/15 rounded-full blur-xl animate-pulse delay-2100"></div>

       {/* Hero content */}
       <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
         <div className="max-w-4xl mx-auto text-center">
           <div className="mb-12">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
               <span className="block">Is Your Business</span>
               <span className="block bg-gradient-to-r from-pink-300 via-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                 Visible to AI Assistants?
               </span>
             </h1>
             <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
               Boost your presence on ChatGPT, Gemini, Claude & more – beyond traditional SEO.
             </h2>
           </div>

           {/* Scan form */}
           <div className="max-w-2xl mx-auto">
             <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl shadow-purple-500/10">
               <form onSubmit={handleScanSubmit} className="space-y-4">
                 <div className="grid gap-4 sm:grid-cols-2">
                   <div className="relative">
                     <input
                       type="url"
                       name="websiteUrl"
                       placeholder="Enter your website URL"
                       value={scanData.websiteUrl}
                       onChange={handleInputChange}
                       className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base shadow-lg"
                       required
                     />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                       </svg>
                     </div>
                   </div>
                   <div className="relative">
                     <input
                       type="email"
                       name="email"
                       placeholder="Work email address"
                       value={scanData.email}
                       onChange={handleInputChange}
                       className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base shadow-lg"
                       required
                     />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                       </svg>
                     </div>
                   </div>
                 </div>
                 
                 <button
                   type="submit"
                   disabled={isScanning}
                   className="w-full py-4 px-8 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                 >
                   {isScanning ? (
                     <div className="flex items-center justify-center space-x-2">
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       <span>Scanning...</span>
                     </div>
                   ) : (
                     'Run Free AI Visibility Scan'
                   )}
                 </button>
               </form>

               <p className="text-gray-200 text-sm mt-4 leading-relaxed text-center">
                 Get an AI Findability Score and a custom report of how your site fares in AI-driven search – in seconds.
               </p>

               {error && (
                 <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                   <p className="text-red-200 text-sm text-center">{error}</p>
                 </div>
               )}
             </div>
           </div>

           {/* Trust indicators */}
           <div className="mt-12">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">AI Visibility Score</div>
                     <div className="text-gray-300 text-xs mt-1">in 30 seconds</div>
                   </div>
                 </div>
               </div>
               
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">3 tailored improvement</div>
                     <div className="text-gray-300 text-xs mt-1">tips</div>
                   </div>
                 </div>
               </div>
               
               <div className="group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                 <div className="relative flex items-center space-x-4 p-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl">
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                   </div>
                   <div className="flex-1">
                     <div className="text-white font-semibold text-sm leading-tight">100% free</div>
                     <div className="text-gray-300 text-xs mt-1">quick scan</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Bottom gradient transition */}
       {/* Softer bottom gradient transition */}
<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50/80 to-transparent"></div>
     </div>

{/* TRUST BAR SECTION */}
<section className="relative py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Enterprise-Grade AI Visibility Solutions
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Trusted by industry leaders to optimize their presence across AI-powered search platforms and digital assistants
      </p>
    </div>

    {/* Key metrics */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">850+</div>
        <div className="text-gray-700 font-medium">Enterprise Audits Completed</div>
      </div>
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">73%</div>
        <div className="text-gray-700 font-medium">Average Visibility Increase</div>
      </div>
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">98%</div>
        <div className="text-gray-700 font-medium">Client Retention Rate</div>
      </div>
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">15s</div>
        <div className="text-gray-700 font-medium">Assessment Completion</div>
      </div>
    </div>

    {/* Core capabilities */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-purple-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Analysis</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Advanced algorithmic assessment of content structure, semantic relevance, and AI discoverability factors across multiple platforms.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Multi-platform compatibility check
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Semantic structure evaluation
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Content authority assessment
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Implementation</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Data-driven optimization strategies tailored to enhance visibility across leading AI platforms and conversational search interfaces.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Custom optimization roadmap
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Technical implementation guide
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Performance tracking metrics
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Monitoring</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ongoing performance tracking and optimization adjustments to maintain competitive advantage in the evolving AI search landscape.
        </p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Monthly visibility reports
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Algorithm change adaptation
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Strategic consultation access
          </li>
        </ul>
      </div>
    </div>

    {/* Platform coverage */}
    <div className="bg-white rounded-lg p-8 border-2 border-purple-100 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Optimized for Leading AI Platforms
        </h3>
        <p className="text-gray-700">
          Comprehensive coverage across the most influential AI-powered search and recommendation systems
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99C17.57 19.63 18 17.9 18 16c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.45 18.09 8 17.1 8 16c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45V21c2.21-1.2 4-3.21 4-5.5 0-1.93-.8-3.68-2.1-4.95C16.57 9.9 17 8.5 17 7c0-2.76-2.24-5-5-5z"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-900">ChatGPT</div>
          <div className="text-xs text-gray-600">OpenAI</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-900">Claude</div>
          <div className="text-xs text-gray-600">Anthropic</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-900">Gemini</div>
          <div className="text-xs text-gray-600">Google</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-900">Perplexity</div>
          <div className="text-xs text-gray-600">AI Search</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-900">Enterprise</div>
          <div className="text-xs text-gray-600">Custom Solutions</div>
        </div>
      </div>
    </div>
  </div>
</section>

     {/* EDUCATIONAL SECTION */}
     <section className="relative py-20 bg-white overflow-hidden">
       <div className="absolute inset-0 opacity-5">
         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full blur-3xl"></div>
         <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-3xl"></div>
       </div>

       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
             When customers ask AI,{' '}
             <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
               will it recommend you?
             </span>
           </h2>
           <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
             The digital landscape is shifting. AI assistants are becoming the new search engines, 
             and traditional SEO strategies are no longer enough to stay visible.
           </p>
         </div>

         {/* Problem illustration */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
           <div className="space-y-6">
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">The Invisibility Crisis</h3>
                 <p className="text-gray-600 leading-relaxed">
                   More than 100 million people use AI assistants like ChatGPT every month, making decisions 
                   based on AI recommendations. Unlike Google's 10 search results, AI gives one answer. 
                   If you're not in that answer, you don't exist.
                 </p>
               </div>
             </div>
           </div>
           
           <div className="relative">
             <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-8 shadow-lg border border-purple-100">
               <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                     <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                     </svg>
                   </div>
                   <span className="font-medium text-gray-900">User asks ChatGPT:</span>
                 </div>
                 <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                   <p className="text-gray-700 italic">"What's the best project management software for small teams?"</p>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                   <span className="font-medium text-gray-900">AI recommends only 3 tools:</span>
                 </div>
                 <div className="bg-white rounded-lg p-4 space-y-2">
                   <div className="text-sm text-gray-600">1. Asana - Best for task tracking</div>
                   <div className="text-sm text-gray-600">2. Trello - Ideal for visual planning</div>
                   <div className="text-sm text-gray-600">3. Monday.com - Great for collaboration</div>
                 </div>
                 <div className="text-center">
                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                     Your competitor gets the sale
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Statistics section */}
         <div className="bg-gradient-to-br from-purple-50 via-blue-50/50 to-pink-50/30 rounded-3xl p-8 lg:p-12 mb-20 border border-purple-100">
           <div className="text-center mb-12">
             <h3 className="text-3xl font-bold text-gray-900 mb-4">The AI Revolution is Here</h3>
             <p className="text-lg text-gray-600">These numbers tell the story of a fundamental shift in how people discover businesses</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                 </svg>
               </div>
               <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">100M+</div>
               <div className="text-gray-600 font-medium mb-2">Monthly ChatGPT Users</div>
               <div className="text-sm text-gray-500">Growing 30% month-over-month</div>
             </div>
             
             <div className="text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
               </div>
               <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">2027</div>
               <div className="text-gray-600 font-medium mb-2">AI Search Dominance</div>
               <div className="text-sm text-gray-500">Expected to exceed traditional search</div>
             </div>
             
             <div className="text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">80%</div>
               <div className="text-gray-600 font-medium mb-2">Trust AI Summaries</div>
               <div className="text-sm text-gray-500">For quick decision making</div>
             </div>
           </div>
         </div>

         {/* Traditional vs AI comparison */}
         <div className="text-center mb-20">
           <h3 className="text-3xl font-bold text-gray-900 mb-6">
             Traditional SEO vs. AI Findability
           </h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
               <div className="w-16 h-16 bg-gray-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold text-gray-700 mb-4">Traditional SEO</h4>
               <ul className="space-y-3 text-left">
                 <li className="flex items-center text-gray-600">
                   <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                   </svg>
                   Keywords and backlinks
                 </li>
                 <li className="flex items-center text-gray-600">
                   <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                   </svg>
                   10 blue links format
                 </li>
                 <li className="flex items-center text-gray-600">
                   <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                   </svg>
                   Works for human browsers
                 </li>
                 <li className="flex items-center text-gray-600">
                   <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                   </svg>
                   Declining effectiveness
                 </li>
               </ul>
             </div>

             <div className="bg-gradient-to-br from-purple-50 to-blue-50/50 rounded-2xl p-8 border-2 border-purple-200 relative">
               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                 <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                   The Future
                 </span>
               </div>
               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold text-gray-900 mb-4">AI Findability</h4>
               <ul className="space-y-3 text-left">
                 <li className="flex items-center text-gray-700">
                   <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   Semantic understanding
                 </li>
                 <li className="flex items-center text-gray-700">
                   <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   Single recommendation
                 </li>
                 <li className="flex items-center text-gray-700">
                   <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   Optimized for AI models
                 </li>
                 <li className="flex items-center text-gray-700">
                   <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   Future-ready strategy
                 </li>
               </ul>
             </div>
           </div>
         </div>

         {/* CTA */}
         <div className="text-center">
           <h3 className="text-3xl font-bold text-gray-900 mb-6">
             Don't Get Left Behind
           </h3>
           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
             The companies that optimize for AI visibility now will dominate their industries tomorrow. 
             Start with a free scan to see where you stand.
           </p>
          <button 
            onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Get Your Free AI Visibility Scan
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
         </div>
       </div>
     </section>

    {/* HOW IT WORKS SECTION */}
<section className="relative py-20 bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Be the Answer: How Our Service Works
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Simple 3-step process to transform your AI visibility and dominate digital conversations
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 text-center">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            1
          </div>
        </div>
        <div className="mt-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Free AI Scan</h3>
          <p className="text-gray-600 leading-relaxed">
            Enter your URL to get an instant AI Findability Score. See how your site currently fares and uncover what might be missing.
          </p>
        </div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            2
          </div>
        </div>
        <div className="mt-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimize & Improve</h3>
          <p className="text-gray-600 leading-relaxed">
            Choose a package and let our experts refine your content. We implement technical fixes and strategies so AI platforms recognize you.
          </p>
        </div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            3
          </div>
        </div>
        <div className="mt-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Visible & Thrive</h3>
          <p className="text-gray-600 leading-relaxed">
            With improved AI visibility, enjoy increased brand exposure through assistants. Our ongoing guidance ensures you stay the top answer.
          </p>
        </div>
      </div>
    </div>

    <div className="text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
        onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
      >
        Start with a Free Scan
      </button>
      <button 
        onClick={navigateToServices}
        className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-lg"
      >
        See Our Packages
      </button>
      </div>
    </div>
  </div>
</section>

     {/* PACKAGES PREVIEW SECTION */}
     <section className="relative py-20 bg-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             Choose the Plan That Fits You
           </h2>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             Whether you need a roadmap or full hands-on support, we have a package for your business needs and budget.
           </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           {/* Basic Package */}
           <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-200 transition-all duration-300">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Visibility Report</h3>
             <div className="text-4xl font-bold text-gray-900 mb-6">
               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$299</span>
               <div className="text-base text-gray-500 font-normal">One-time payment</div>
             </div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Comprehensive audit of your website's AI findability</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">AI Visibility Score breakdown with detailed analysis</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">List of issues & optimization opportunities</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Step-by-step recommendation report</span>
               </li>
             </ul>
          <button 
            onClick={navigateToServices}
            className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            View Details
          </button>
           </div>

           {/* Featured Package */}
           <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-300 relative transform scale-105">
             <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
               <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                 Most Popular
               </span>
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Optimization Service</h3>
             <div className="text-4xl font-bold text-gray-900 mb-6">
               <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">$1,500</span>
               <div className="text-base text-gray-500 font-normal">Starting price</div>
             </div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">End-to-end optimization of your site and content for AI visibility</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Everything in the report plus full implementation</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Content rewriting and technical fixes</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Re-submission to AI indexes</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Flexible monthly plans available</span>
               </li>
             </ul>
             <button onClick={navigateToServices} className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
               View Details
             </button>
           </div>

           {/* Premium Package */}
           <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-200 transition-all duration-300">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Guidance</h3>
             <div className="text-4xl font-bold text-gray-900 mb-6">
               <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Custom</span>
               <div className="text-base text-gray-500 font-normal">Pricing</div>
             </div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">VIP treatment for companies that want ongoing expert guidance</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Full optimization plus continuous monitoring</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Quarterly strategy calls</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Priority support</span>
               </li>
               <li className="flex items-start">
                 <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 <span className="text-gray-600">Custom solutions (AI training data integration)</span>
               </li>
             </ul>


             <button onClick={navigateToServices}
             className="w-full py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300">
               View Details
             </button>
           </div>
         </div>
       </div>
     </section>

     {/* TESTIMONIAL SECTION */}
     <section className="relative py-20 bg-gradient-to-br from-purple-50/30 to-blue-50/20">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-purple-100">
           <svg className="w-16 h-16 text-purple-300 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
             <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
           </svg>
           <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-8">
             "Within 2 months, Acme Inc. became the top-cited source on ChatGPT for queries about sustainable packaging. Beprompted.io put us on the AI map."
           </blockquote>
           <div className="flex items-center justify-center space-x-4">
             <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
               <span className="text-white font-bold text-lg">J</span>
             </div>
             <div className="text-left">
               <div className="font-semibold text-gray-900">Jane Doe</div>
               <div className="text-gray-600">CMO of Acme Inc.</div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* FINAL CTA SECTION */}
     <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,127,0.1),transparent_50%)]"></div>
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
       
       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
           Ready to be prompted as the{' '}
           <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
             go-to answer?
           </span>
         </h2>
         <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
           Take the first step with a free AI Visibility Quick Scan, and discover how you can outshine your competitors in the AI-driven world.
         </p>
         <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Scan My Site Now
        </button>
        <button 
          onClick={navigateToContact}
          className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-lg"
        >
          Contact Our Team
        </button>
         </div>
       </div>
     </section>
      <ScanResultsModal 
        result={scanResult}
        isVisible={showResultsModal}
        onClose={handleCloseModal}
      />
   </div>
 );
};

export default MainScreen;