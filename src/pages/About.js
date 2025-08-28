import React from 'react';

const About = () => {
  const mission = {
    title: "Our Mission: Putting Your Business at the Heart of Every AI Answer",
    description: "beprompted.io was born from a simple realization: The world of search is changing. With the explosion of AI assistants and chat-based search, we saw businesses struggling to keep up. Our mission is to make sure innovative companies don't get left behind as technology evolves. We combine deep expertise in SEO, content strategy, and AI to help your brand become the one that AI trusts and recommends.",
  };

  const approach = [
    {
      icon: "🚀",
      title: "Innovation",
      description: "We constantly experiment with AI platforms to find what works – and share those insights with our clients."
    },
    {
      icon: "🔍",
      title: "Transparency",
      description: "AI can seem like a black box. We demystify it with clear reports and no-nonsense advice."
    },
    {
      icon: "📈",
      title: "Impact-Focused",
      description: "We care about real results – more visibility, more traffic, more leads – not vanity metrics."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We work alongside your team. Whether you're technical or not, we make sure you're in the loop and comfortable with every change."
    }
  ];

  const stats = [
    { number: "100M+", label: "AI Users Reached", description: "Monthly active users across AI platforms" },
    { number: "850+", label: "Audits Completed", description: "Comprehensive AI visibility assessments" },
    { number: "73%", label: "Average Increase", description: "In AI recommendation frequency" },
    { number: "2019", label: "Founded", description: "Pioneering AI visibility optimization" }
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Founded as traditional SEO consultancy, noticing early shifts in search behavior"
    },
    {
      year: "2022",
      title: "AI Revolution",
      description: "Pivoted focus as ChatGPT launched, recognizing the fundamental change in information discovery"
    },
    {
      year: "2023",
      title: "GEO Pioneer",
      description: "Developed proprietary Generative Engine Optimization methodology"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Helping 500+ businesses optimize for AI visibility across all major platforms"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 pt-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-500/15 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-indigo-400/12 to-purple-500/18 rounded-full blur-2xl animate-pulse delay-1400"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                About BePrompted
              </span>
              <span className="block text-white mt-2">The AI Visibility Experts</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Why beprompted.io Exists: We're here to help businesses navigate the AI revolution in search.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {mission.title}
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 via-blue-50/50 to-pink-50/30 rounded-3xl p-8 lg:p-12 border border-purple-100 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                {mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-600">Measurable results across the AI visibility landscape</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">How we became leaders in AI visibility optimization</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-600 to-blue-600"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full z-10"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values/Approach Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach & Values</h2>
            <p className="text-lg text-gray-600">The core principles that guide our work</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {approach.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Platform Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Expertise</h2>
            <p className="text-lg text-gray-600">We optimize your visibility across all major AI platforms</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "ChatGPT", company: "OpenAI", color: "from-green-400 to-blue-500" },
              { name: "Claude", company: "Anthropic", color: "from-orange-400 to-red-500" },
              { name: "Gemini", company: "Google", color: "from-blue-400 to-purple-500" },
              { name: "Perplexity", company: "AI Search", color: "from-purple-400 to-pink-500" },
              { name: "Copilot", company: "Microsoft", color: "from-indigo-400 to-cyan-500" }
            ].map((platform, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${platform.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                <div className="text-xs text-gray-600">{platform.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/20 via-transparent to-cyan-600/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Curious to learn more or have questions?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            We're not a faceless AI – we're people who love to talk about this stuff! Feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
            <a 
              href="mailto:hello@bepromoted.io" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;