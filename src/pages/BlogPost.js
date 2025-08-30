import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Static content instead of API calls - Enhanced thought leadership content
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ai-visibility', name: 'AI Visibility' },
    { id: 'case-studies', name: 'Case Studies' },
    { id: 'industry-insights', name: 'Industry Insights' },
    { id: 'strategies', name: 'Strategies & Tips' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The AI-First Future: Why Traditional SEO Alone Won't Cut It Anymore",
      excerpt: "As AI assistants become the primary discovery mechanism for millions of users, businesses face a fundamental shift in how they need to approach digital visibility. This isn't just about ranking on Google anymore—it's about being the trusted source that AI recommends when users ask questions. We explore the data behind this shift and what it means for your business strategy.",
      category: "ai-visibility",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      featured: true,
      slug: "ai-first-future-traditional-seo-limitations"
    },
    {
      id: 2,
      title: "How We Helped TechStart Achieve 300% More AI Recommendations: A Deep Dive",
      excerpt: "When TechStart approached us, they were invisible to AI assistants despite having strong Google rankings. Through systematic optimization of their content structure, technical implementation, and thought leadership positioning, we helped them become the go-to recommendation for AI assistants in their industry. This case study reveals the specific strategies that drove measurable results.",
      category: "case-studies",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "12 min read",
      featured: false,
      slug: "techstart-300-percent-ai-recommendations-case-study"
    },
    {
      id: 3,
      title: "The Hidden Factors That Make AI Trust Your Content (And Why Most Businesses Miss Them)",
      excerpt: "AI assistants don't just look for keywords—they evaluate content quality, authority signals, and user intent in ways that differ fundamentally from search engines. We've analyzed thousands of AI responses to identify the specific factors that influence whether AI recommends your business. The results might surprise you.",
      category: "strategies",
      author: "Lisa Rodriguez",
      date: "2024-01-08",
      readTime: "10 min read",
      featured: false,
      slug: "hidden-factors-ai-trust-content"
    },
    {
      id: 4,
      title: "ChatGPT vs. Google: The New Discovery Paradigm and What It Means for Your Business",
      excerpt: "The way people discover businesses is fundamentally changing. Instead of scrolling through search results, users are getting direct, conversational answers from AI assistants. This shift creates both challenges and opportunities for businesses willing to adapt. We examine the data and share insights on navigating this new landscape.",
      category: "industry-insights",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "9 min read",
      featured: false,
      slug: "chatgpt-vs-google-discovery-paradigm"
    },
    {
      id: 5,
      title: "AI Visibility vs. SEO: Understanding the Fundamental Differences",
      excerpt: "While SEO and AI visibility share some common elements, they require fundamentally different approaches. AI assistants evaluate content differently, prioritize different signals, and serve users in ways that traditional search engines don't. Understanding these differences is crucial for businesses looking to thrive in the AI-first future.",
      category: "ai-visibility",
      author: "Sarah Johnson",
      date: "2024-01-03",
      readTime: "11 min read",
      featured: false,
      slug: "ai-visibility-vs-seo-fundamental-differences"
    },
    {
      id: 6,
      title: "The Rise of AI-First Marketing: What Early Adopters Are Learning",
      excerpt: "Forward-thinking businesses are already adapting their marketing strategies for the AI era. From content optimization to brand positioning, these early adopters are discovering what works—and what doesn't—in the new AI-driven landscape. We share insights from leading companies and what you can learn from their experiences.",
      category: "industry-insights",
      author: "Michael Chen",
      date: "2023-12-28",
      readTime: "7 min read",
      featured: false,
      slug: "rise-ai-first-marketing-early-adopters"
    },
    {
      id: 7,
      title: "Content Optimization for AI Assistants: A Technical Deep Dive",
      excerpt: "Optimizing content for AI assistants requires understanding how these systems process and evaluate information. From semantic structure to authority signals, we break down the technical aspects of AI content optimization and provide actionable strategies for improving your AI visibility.",
      category: "strategies",
      author: "Lisa Rodriguez",
      date: "2023-12-25",
      readTime: "13 min read",
      featured: false,
      slug: "content-optimization-ai-assistants-technical"
    },
    {
      id: 8,
      title: "Case Study: How a Local Restaurant Increased Orders by 150% Through AI Visibility",
      excerpt: "When a local restaurant realized they weren't being recommended by AI assistants, they took action. Through strategic content optimization and local AI visibility tactics, they achieved a 150% increase in online orders. This case study shows how businesses of any size can benefit from AI optimization.",
      category: "case-studies",
      author: "David Kim",
      date: "2023-12-20",
      readTime: "9 min read",
      featured: false,
      slug: "local-restaurant-150-percent-orders-ai-visibility"
    },
    {
      id: 9,
      title: "The Psychology of AI Recommendations: Why Users Trust AI Over Search Results",
      excerpt: "Understanding why users trust AI recommendations more than traditional search results is crucial for businesses adapting to this new landscape. We explore the psychological factors at play and what this means for your content strategy and brand positioning.",
      category: "industry-insights",
      author: "Sarah Johnson",
      date: "2023-12-18",
      readTime: "8 min read",
      featured: false,
      slug: "psychology-ai-recommendations-user-trust"
    },
    {
      id: 10,
      title: "Building Authority in the AI Era: Strategies That Actually Work",
      excerpt: "AI assistants prioritize authoritative, trustworthy sources when making recommendations. But building authority in the AI era requires different strategies than traditional SEO. We share proven approaches for establishing your business as a trusted source that AI assistants consistently recommend.",
      category: "strategies",
      author: "Michael Chen",
      date: "2023-12-15",
      readTime: "10 min read",
      featured: false,
      slug: "building-authority-ai-era-strategies"
    }
  ];

  const popularTopics = [
    { name: "AI Visibility Fundamentals", count: 18, icon: "🤖" },
    { name: "Case Studies & Results", count: 12, icon: "📊" },
    { name: "Industry Trends", count: 15, icon: "📈" },
    { name: "Technical Strategies", count: 9, icon: "⚙️" },
    { name: "Content Optimization", count: 11, icon: "✍️" }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>AI Visibility Insights</h1>
            <p className="hero-subtitle">
              Expert analysis, case studies, and strategies for thriving in the AI-first future of business discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <div className="container">
            <div className="featured-content">
              <div className="featured-badge">Featured Insight</div>
              <h2>{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="featured-meta">
                <span className="author">By {featuredPost.author}</span>
                <span className="date">{new Date(featuredPost.date).toLocaleDateString()}</span>
                <span className="read-time">{featuredPost.readTime}</span>
              </div>
              <Link to={`/blog/${featuredPost.slug}`} className="featured-cta">
                Read Full Article
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="category-filters">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        <div className="container">
          <div className="posts-grid">
            {regularPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="card-category">{post.category.replace('-', ' ')}</div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-meta">
                  <span className="author">By {post.author}</span>
                  <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="read-time">{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="card-cta">
                  Read More
                </Link>
              </article>
            ))}
          </div>
          
          {regularPosts.length === 0 && (
            <div className="no-posts">
              <h3>No posts found for this category</h3>
              <p>Try selecting a different category or check back later for new content.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Ahead of the AI Curve</h2>
            <p>Get the latest insights on AI visibility, industry trends, and actionable strategies delivered to your inbox.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="popular-topics">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Insights</h2>
            <p>Dive deeper into the topics that matter most for AI visibility</p>
          </div>
          
          <div className="topics-grid">
            {popularTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div className="topic-icon">{topic.icon}</div>
                <h3>{topic.name}</h3>
                <span className="topic-count">{topic.count} articles</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to See How Your Business Performs with AI?</h2>
            <p>Discover your current AI visibility score and get actionable insights to improve your presence with AI assistants.</p>
            <div className="cta-buttons">
              <a href="/" className="cta-button primary">Try Free AI Scan</a>
              <a href="/contact" className="cta-button secondary">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 