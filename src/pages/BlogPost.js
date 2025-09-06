import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE } from '../config/apiBase';
import './Blog.css';

export default function BlogPost(){
  const { id: slug } = useParams();
  const [post,setPost]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(`${API_BASE}/content/blogs/${slug}`);
        const data = await res.json();
        if(!data.success) throw new Error(data.error||'Not found');
        setPost(data.post);
      } catch(e){ setError(e.message);} finally { setLoading(false);} })();
  },[slug]);

  if(loading) return <div className='pt-40 text-center text-white'>Loading post...</div>;
  if(error) return <div className='pt-40 text-center text-red-400'>{error}</div>;
  if(!post) return <div className='pt-40 text-center text-white'>Post not found</div>;

  return (
    <div className='min-h-screen pt-32 pb-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white'>
      <div className='max-w-3xl mx-auto px-6'>
        <div className='mb-8'>
          <Link to='/blog' className='text-sm text-purple-300 hover:text-purple-200'>&larr; Back to Blog</Link>
        </div>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 leading-tight'>{post.title}</h1>
        <div className='flex flex-wrap gap-4 text-xs text-gray-300 mb-8'>
          <span className='uppercase tracking-wide bg-white/10 px-2 py-1 rounded'>{post.category}</span>
          {post.author && <span>By {post.author}</span>}
          {post.readTime && <span>{post.readTime}</span>}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className='text-lg text-gray-200 mb-10'>{post.excerpt}</p>
        <article className='prose prose-invert max-w-none'>
          {post.content.split(/\n{2,}/).map((block,i)=>{
            const h2 = block.match(/^##\s+(.*)/);
            const h3 = block.match(/^###\s+(.*)/);
            if(h2) return <h2 key={i}>{h2[1]}</h2>;
            if(h3) return <h3 key={i}>{h3[1]}</h3>;
            return <p key={i}>{block}</p>;
          })}
        </article>
      </div>
    </div>
  );
}