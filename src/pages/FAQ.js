import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is AI findability (AI visibility)? Why does it matter for my business?",
      answer: "AI findability refers to how easily AI assistants and chatbots can find and reference your business's information when users ask questions. It matters because millions of people use AI assistants to make decisions – from choosing products to finding service providers. If the AI doesn't 'know' about your brand or finds your content relevant, it won't mention you, and you lose out on potential customers. Traditional SEO got you on Google's page 1; now the game is getting into an AI's direct answer. Ensuring AI findability means your business stays visible and competitive in this new landscape."
    },
    {
      id: 2,
      question: "How is this different from regular SEO or Google search optimization?",
      answer: "It's related but not the same. Traditional SEO focuses on improving rankings on search engines like Google – so that your link appears among many results. AI optimization (what we do) focuses on getting your content featured within the single answer an AI assistant gives. This involves not just keywords and links, but making sure AI models understand your content, trust your brand, and have your information in their 'knowledge.' Techniques include structuring your content for easy AI digestion, publishing Q&A content, and building brand mentions even without direct links. In short: SEO is about ranking; AI optimization is about being the answer the AI provides. We also sometimes call it GEO (Generative Engine Optimization) or AEO (Answer Engine Optimization)."
    },
    {
      id: 3,
      question: "What does the AI Quick Scan check exactly?",
      answer: "The Quick Scan uses a combination of crawlers and AI analysis to evaluate key factors on your site: It scans your website's content and structure (much like a search engine) to see if it's organized in a way an AI could easily interpret. For example, do you have clear headings, is important info in text (vs. images or scripts), do you have FAQ sections, etc. It may use AI models to fetch a quick 'impression' of your brand (similar to how our full analysis might query ChatGPT or Gemini about your site). This shows what an AI might say about you. It checks for technical SEO fundamentals (like a sitemap, robot.txt openness, meta tags) that also impact AI crawling. It looks at your off-site presence by searching for your brand/name in AI or web results (e.g., Wikipedia, major news mentions, etc.) because that influences AI knowledge. All these are distilled into your AI Findability Score and top recommendations. The Quick Scan is a high-level overview; our detailed report goes much deeper with these checks."
    },
    {
      id: 4,
      question: "Is the AI Quick Scan really free? What's the catch?",
      answer: "Yes, it's completely free! No catch – we won't ask for credit card or anything for the basic scan. We offer it because we believe once you see the results and insights, you'll understand the importance of AI optimization. It's our way of providing immediate value and starting a conversation. After the scan, if you want to actually act on the insights, that's where our paid packages come in – but there's absolutely no obligation. (And you can unsubscribe from our emails at any time. We respect your inbox.)"
    },
    {
      id: 5,
      question: "Will you make changes to my website directly? How does implementation work?",
      answer: "For the Report package, we do not make changes – we deliver recommendations and it's up to you to implement (though we're happy to clarify anything in the report). For the Optimization service, yes, with your permission we will make agreed-upon changes to your site. Typically, we start with an audit, discuss the plan with you, then our team (which can include developers, SEO specialists, copywriters) will update your website content and technical settings. We coordinate closely – for example, we might provide draft content for approval or request access to your CMS. If you prefer, we can also give instructions to your in-house web team to implement; we're flexible. In the Premium package, we form an ongoing partnership and will continuously fine-tune your site/content over time, acting with your go-ahead as an external team member."
    },
    {
      id: 6,
      question: "How do you measure success? What results can I expect?",
      answer: "Great question. In this new field, the ultimate success is when AI assistants start mentioning or citing your brand in answers to relevant user queries. Concretely, we measure improvements in: AI Visibility Score – we aim to significantly raise your score (we'll show before vs. after reports). Mentions in AI – using tracking tools, we monitor if/when your brand appears in AI-generated search results or summary answers. For example, an increase in times ChatGPT or Bing Chat references your site. Organic traffic/leads from AI – some AI tools like Bing Chat actually drive click traffic; we see if those referrals increase. Also, we look for indirect uplifts: if users see you in AI, they might directly visit or search your brand (we can track branded search volume, etc.). If applicable, conversion metrics on your site (more sign-ups, inquiries attributed to people finding you via AI or the improved content). While every case is different, many clients could see their score jump by 20-30 points after optimization, and within a few months start to gain traffic from AI sources that were zero before. We'll be transparent in our reports, and we keep expectations realistic – this is new territory, but we are continuously improving our methods to maximize results."
    },
    {
      id: 7,
      question: "What if my website is very small or, conversely, very large?",
      answer: "Our approach scales. If you have a small site (e.g., a startup with just a homepage and a few pages), the Quick Scan and report will focus on key content to add or changes to make on those pages, and perhaps ideas for creating more content (like a blog or FAQ) to increase AI relevance. If you have a large site with hundreds of pages, our tools will sample key sections (and in a full project, we prioritize the sections most likely to impact AI visibility). For large enterprises, our premium service is designed to methodically optimize section by section and coordinate with your content teams. In short, any size site can benefit – we tailor our recommendations to your scale."
    },
    {
      id: 8,
      question: "How do you keep up with AI developments? (What if the AI algorithms change?)",
      answer: "The AI field is moving fast – new models, updates to how they retrieve info, etc. That's precisely why having a partner like us is valuable. We literally make it our job to stay updated: We follow research and updates from OpenAI, Google, Anthropic and others closely. We test our demo sites on new AI features (for example, when Google Gemini launches, we'll be testing how it picks sources on day 1). We are building relationships and reading industry studies (like the Bain study on AI search usage) to anticipate trends. When algorithms change, we update our methods and inform our clients (Premium clients get these insights proactively). The fundamental principle won't change though: providing clear, authoritative content that answers questions will always be the right approach – we might just need to adjust how we provide it."
    },
    {
      id: 9,
      question: "Is my data safe with beprompted.io?",
      answer: "Absolutely. We take privacy and security seriously. When you run the Quick Scan, we only use the URL to fetch and analyze publicly available info on your site – we don't access anything private. The email you provide is used to send your results and (if you opt-in) occasional updates; we never sell or misuse it. For our service work, if we need access to your website or analytics, we'll follow secure procedures and only access what's necessary. We can also sign an NDA if required. All analysis results are confidential and used only to help you. We also adhere to GDPR and other relevant regulations for international clients."
    }
  ];

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
      <section className="hero-section">
        <div className="hero-bg-effects">
          <div className="bg-effect bg-effect-1"></div>
          <div className="bg-effect bg-effect-2"></div>
          <div className="bg-effect bg-effect-3"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Frequently Asked</span>
            <span className="white-text">Questions</span>
          </h1>
          <p className="hero-subtitle">
            Everything you need to know about AI visibility and our services.
          </p>
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
          {faqData.map((faq) => (
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
        </div>ß
      </section>
    </div>
  );
};

export default FAQ;