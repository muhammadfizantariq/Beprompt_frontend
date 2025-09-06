import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config/apiBase';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [emailSubscribe, setEmailSubscribe] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ai-visibility', name: 'AI Visibility' },
    { id: 'case-studies', name: 'Case Studies' },
    { id: 'industry-insights', name: 'Industry Insights' },
    { id: 'strategies', name: 'Strategies & Tips' }
  ];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const res = await fetch(`${API_BASE}/content/blogs`);
        const data = await res.json();
        if(!data.success) throw new Error(data.error||'Failed to load posts');
        setPosts(data.posts);
      } catch(e){ setError(e.message); } finally { setLoading(false); }
    })();
  }, []);

  const popularTopics = [
    { name: "AI Visibility Fundamentals", count: 18, gradient: "purple-blue" },
    { name: "Case Studies & Results", count: 12, gradient: "pink-purple" },
    { name: "Industry Trends", count: 15, gradient: "blue-cyan" },
    { name: "Technical Strategies", count: 9, gradient: "indigo-purple" },
    { name: "Content Optimization", count: 11, gradient: "green-blue" }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', emailSubscribe);
    setEmailSubscribe('');
    alert('Thank you for subscribing!');
  };

  const navigateToPost = (slug) => {
    window.location.href = `/blog/${slug}`;
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="blog-container">
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
                AI Visibility Insights
              </span>
            <span className="block text-white mt-2">Insights</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Expert analysis, case studies, and strategies for thriving in the AI-first future of business discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
  {featuredPost && !loading && (
        <section className="featured-section">
          <div className="featured-container">
            <div className="featured-card">
              <div className="featured-badge">Featured Insight</div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="featured-meta">
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  By {featuredPost.author}
                </div>
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(featuredPost.date).toLocaleDateString()}
                </div>
                <div className="meta-item">
                  <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {featuredPost.readTime}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => navigateToPost(featuredPost.slug)}
                className="featured-button"
              >
                Read Full Article
                <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="filters-section">
        <div className="filters-container">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="posts-section">
        <div className="posts-container">
          {loading && <p className="text-center text-white">Loading posts...</p>}
          {error && <p className="text-center text-red-400 text-sm">{error}</p>}
          {!loading && !error && regularPosts.length > 0 ? (
            <div className="posts-grid">
              {regularPosts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-category">
                    {post.category.replace('-', ' ').toUpperCase()}
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span>By {post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => navigateToPost(post.slug)}
                    className="post-link"
                  >
                    Read More
                    <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          ) : (!loading && !error && (
            <div className="no-posts">
              <div className="no-posts-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="no-posts-title">No posts found for this category</h3>
              <p className="no-posts-text">Try selecting a different category or check back later for new content.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Topics */}
      <section className="topics-section">
        <div className="topics-container">
          <div className="topics-header">
            <h2 className="topics-title">Explore Our Insights</h2>
            <p className="topics-subtitle">Dive deeper into the topics that matter most for AI visibility</p>
          </div>
          
          <div className="topics-grid">
            {popularTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div className={`topic-icon ${topic.gradient}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="topic-name">{topic.name}</h3>
                <span className="topic-count">{topic.count} articles</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-card">
            <h2 className="newsletter-title">Stay Ahead of the AI Curve</h2>
            <p className="newsletter-subtitle">
              Get the latest insights on AI visibility, industry trends, and actionable strategies delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email"
                value={emailSubscribe}
                onChange={(e) => setEmailSubscribe(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button 
                type="submit"
                className="newsletter-button"
              >
                Subscribe
              </button>
            </form>
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-effects">
          <div className="cta-bg-effect"></div>
        </div>
        
        <div className="cta-content">
          <h2 className="cta-title">Ready to See How Your Business Performs with AI?</h2>
          <p className="cta-subtitle">
            Discover your current AI visibility score and get actionable insights to improve your presence with AI assistants.
          </p>
          <div className="cta-buttons">
            <button 
              type="button"
              onClick={navigateToHome}
              className="cta-button cta-button-primary"
            >
              Try Free AI Scan
            </button>
            <button 
              type="button"
              onClick={navigateToContact}
              className="cta-button cta-button-secondary"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;