import React, { useEffect, useState, useRef } from 'react';
import { API_BASE } from '../config/apiBase';

function useAuthHeader(){
  const token = typeof window!=='undefined'?localStorage.getItem('authToken'):null;
  return token? { Authorization: 'Bearer '+token, 'Content-Type':'application/json' } : { 'Content-Type':'application/json' };
}

class AdminErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={ hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error, info){ console.error('AdminContentManager crashed:', error, info); }
  render(){
    if(this.state.hasError){
      return <div className='pt-32 px-6 text-center text-red-400'>Admin panel error: {this.state.error?.message||'Unknown error'}<div className='mt-4'><button onClick={()=>window.location.reload()} className='px-4 py-2 bg-white/10 rounded hover:bg-white/20'>Reload</button></div></div>;
    }
    return this.props.children;
  }
}

export default function AdminContentManager(){
  const [posts,setPosts]=useState([]);
  const [faqs,setFaqs]=useState([]);
  const [loading,setLoading]=useState(true); // overall initial load state (first paint)
  const [postsLoading,setPostsLoading]=useState(true);
  const [faqsLoading,setFaqsLoading]=useState(true);
  const [error,setError]=useState(null);
  const [editingPost,setEditingPost]=useState(null); // holds the post being edited/created
  const [editingFaq,setEditingFaq]=useState(null);
  const [postQuery,setPostQuery]=useState('');
  const [faqQuery,setFaqQuery]=useState('');
  const [showPosts,setShowPosts]=useState(true);
  const [showFaqs,setShowFaqs]=useState(true);
  const [view,setView]=useState('posts'); // 'posts' | 'faqs' | 'messages' | 'analysis'
  const [messages,setMessages]=useState([]);
  const [messageQuery,setMessageQuery]=useState('');
  const [messagesPage,setMessagesPage]=useState(1);
  const [messagesTotal,setMessagesTotal]=useState(0);
  const [expandedMessages,setExpandedMessages]=useState(()=> new Set());
  const [messageStatusFilter,setMessageStatusFilter]=useState('all'); // all | new | viewed | resolved
  // If legacy value 'resolved' selected after removal, normalize to 'all'
  useEffect(()=>{ if(messageStatusFilter==='resolved') setMessageStatusFilter('all'); },[messageStatusFilter]);
  const pageSize = 20;
  const analysisPageSize = 25;
  const [analysisRecords,setAnalysisRecords]=useState([]);
  const [analysisPage,setAnalysisPage]=useState(1);
  const [analysisTotal,setAnalysisTotal]=useState(0);
  const [analysisQuery,setAnalysisQuery]=useState('');
  const [analysisStatusFilter,setAnalysisStatusFilter]=useState('all');
  const headers = useAuthHeader();
  // Runtime error banner ref (must be before any early returns for hook order)
  const runtimeErrorRef = useRef(null);
  useEffect(()=>{
    function handler(e){
      const msg = (e?.message||'').toLowerCase();
      if(msg.includes('unexpected token') && msg.includes('<')){
        if(runtimeErrorRef.current){
          runtimeErrorRef.current.textContent = 'A network/proxy returned HTML instead of JSON. Some admin data may not load. Check auth token / CORS.';
        }
      }
    }
    window.addEventListener('error', handler);
    return ()=> window.removeEventListener('error', handler);
  },[]);

  // Safe JSON helper: gracefully handles HTML/error responses
  async function safeJson(res){
    const ct = res.headers.get('content-type')||'';
    let text;
    try { text = await res.text(); } catch { return { ok:false, error:'Network read error' }; }
    if(!ct.includes('application/json')){
      // Likely an HTML error / proxy page
      if(text.trim().startsWith('<')){
        return { ok:false, error:`Non-JSON response (${res.status})` };
      }
    }
    try { return { ok:true, data: JSON.parse(text) }; } catch(e){ return { ok:false, error: e.message }; }
  }

  async function loadPosts(){
    setPostsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/blogs`, { headers });
      const parsed = await safeJson(res);
      if(parsed.ok && parsed.data.success){ setPosts(parsed.data.posts); }
      else if(parsed.ok) { throw new Error(parsed.data.error||'Blog fetch failed'); }
      else { throw new Error(parsed.error); }
    } catch(e){ setError(prev=> prev||e.message); }
    finally { setPostsLoading(false); setLoading(false); }
  }

  async function loadFaqs(){
    setFaqsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/faqs`, { headers });
      const parsed = await safeJson(res);
      if(parsed.ok && parsed.data.success){ setFaqs(parsed.data.faqs); }
      else if(parsed.ok) { throw new Error(parsed.data.error||'FAQ fetch failed'); }
      else { throw new Error(parsed.error); }
    } catch(e){ setError(prev=> prev||e.message); }
    finally { setFaqsLoading(false); setLoading(false); }
  }

  async function loadAll(){
    // Kick off independently for progressive render
    loadPosts();
    loadFaqs();
  }

  async function loadMessages(page=1, q=''){
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if(q) params.append('q', q);
      const res = await fetch(`${API_BASE}/admin/contact-messages?`+params.toString(), { headers });
      const parsed = await safeJson(res);
      if(parsed.ok && parsed.data.success){
        setMessages(parsed.data.items);
        setMessagesTotal(parsed.data.total);
        setMessagesPage(parsed.data.page);
      } else if(!parsed.ok) {
        console.warn('Messages load non-JSON:', parsed.error);
      }
    } catch(e){ console.warn('Failed loading messages', e.message); }
  }

  async function updateMessageStatus(id, status){
    try {
      const res = await fetch(`${API_BASE}/admin/contact-messages/${id}/status`, { method:'PATCH', headers, body: JSON.stringify({ status }) });
      if(!res.ok){ console.warn('Status update failed', res.status); return; }
      await loadMessages(messagesPage,messageQuery);
    } catch(e){ console.warn('Network error updating status', e.message); }
  }

  useEffect(()=>{ loadAll(); },[]);
  useEffect(()=>{ if(view==='messages') loadMessages(messagesPage,messageQuery); },[view,messagesPage]);
  useEffect(()=>{ if(view==='analysis') loadAnalysis(analysisPage, analysisQuery, analysisStatusFilter); },[view,analysisPage]);

  async function loadAnalysis(page=1,q='',status='all'){
    try {
      const params = new URLSearchParams({ page:String(page), limit:String(analysisPageSize) });
      if(q) params.append('q', q);
      if(status!=='all') params.append('status', status);
      const res = await fetch(`${API_BASE}/admin/analysis-records?`+params.toString(), { headers });
      const parsed = await safeJson(res);
      if(parsed.ok && parsed.data.success){
        setAnalysisRecords(parsed.data.items);
        setAnalysisTotal(parsed.data.total);
        setAnalysisPage(parsed.data.page);
      } else if(!parsed.ok) {
        console.warn('Analysis load non-JSON:', parsed.error);
      }
    } catch(e){ console.warn('Failed load analysis', e.message); }
  }

  async function savePost(e){
    e.preventDefault();
    const method = editingPost? 'PUT':'POST';
    const url = editingPost? `${API_BASE}/admin/blogs/${editingPost._id}` : `${API_BASE}/admin/blogs`;
    const body = JSON.stringify(editingPost||{});
  const res = await fetch(url,{ method, headers, body });
  const parsed = await safeJson(res);
  if(!(parsed.ok && parsed.data.success)){ alert(parsed.ok? (parsed.data.error||'Failed') : parsed.error); return; }
    setEditingPost(null); setLoading(true); await loadAll();
  }
  function newPost(){
    if(editingPost && !editingPost._id) return; // already creating
    setEditingPost({ _id: undefined, title:'', excerpt:'', content:'', category:'', author:'', readTime:'5 min', featured:false, published:true });
  }

  async function deletePost(id){ if(!window.confirm('Delete post?')) return; const res = await fetch(`${API_BASE}/admin/blogs/${id}`, { method:'DELETE', headers }); const data=await res.json(); if(!data.success){ alert(data.error); return;} setPosts(p=>p.filter(x=>x._id!==id)); }

  async function saveFaq(e){
    e.preventDefault();
    const method = editingFaq? 'PUT':'POST';
    const url = editingFaq? `${API_BASE}/admin/faqs/${editingFaq._id}` : `${API_BASE}/admin/faqs`;
    const body = JSON.stringify(editingFaq||{});
  const res = await fetch(url,{ method, headers, body });
  const parsed = await safeJson(res);
  if(!(parsed.ok && parsed.data.success)){ alert(parsed.ok? (parsed.data.error||'Failed') : parsed.error); return; }
    setEditingFaq(null); setLoading(true); await loadAll();
  }
  function newFaq(){
    if(editingFaq && !editingFaq._id) return;
    setEditingFaq({ _id: undefined, question:'', answer:'', category:'', order:0, published:true });
  }
  async function deleteFaq(id){ if(!window.confirm('Delete FAQ?')) return; const res=await fetch(`${API_BASE}/admin/faqs/${id}`,{ method:'DELETE', headers }); const data=await res.json(); if(!data.success){ alert(data.error); return;} setFaqs(f=>f.filter(x=>x._id!==id)); }

  // --- Filtering (no useMemo to avoid hook ordering issues with early returns) ---
  const filteredPosts = posts.filter(p=> p.title.toLowerCase().includes(postQuery.toLowerCase()));
  const filteredFaqs = faqs.filter(f=> f.question.toLowerCase().includes(faqQuery.toLowerCase()));
  let filteredMessages = messages.filter(m=> {
    if(!messageQuery) return true;
    const q = messageQuery.toLowerCase();
    return (m.name||'').toLowerCase().includes(q) || (m.email||'').toLowerCase().includes(q) || (m.message||'').toLowerCase().includes(q) || (m.business||'').toLowerCase().includes(q);
  });
  if(messageStatusFilter !== 'all') {
    filteredMessages = filteredMessages.filter(m=> m.status === messageStatusFilter);
  }

  if(error && posts.length===0 && faqs.length===0 && view!=='analysis' && view!=='messages'){
    return <div className='pt-32 text-center text-red-400'>{error}</div>;
  }

  // --- Reusable inline edit form components ---
  const PostEditForm = ({value,onChange,onCancel,onSubmit}) => (
    <form onSubmit={onSubmit} className='mt-3 space-y-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 p-4 border border-white/10 backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-sm tracking-wide'>{value._id? 'Edit Post':'New Post'}</h3>
        <div className='flex gap-2'>
          <button type='button' onClick={onCancel} className='text-xs px-2 py-1 rounded bg-gray-600/70 hover:bg-gray-500 transition'>Cancel</button>
          <button type='submit' className='text-xs px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 shadow-sm'>Save</button>
        </div>
      </div>
      <input className='w-full text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Title' value={value.title} onChange={e=>onChange({...value,title:e.target.value})} />
      <textarea className='w-full text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' rows={2} placeholder='Excerpt' value={value.excerpt} onChange={e=>onChange({...value,excerpt:e.target.value})} />
      <textarea className='w-full text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none font-mono' rows={6} placeholder='Content (Markdown allowed)' value={value.content} onChange={e=>onChange({...value,content:e.target.value})} />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        <input className='text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Category' value={value.category} onChange={e=>onChange({...value,category:e.target.value})} />
        <input className='text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Author' value={value.author} onChange={e=>onChange({...value,author:e.target.value})} />
        <input className='text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Read Time' value={value.readTime} onChange={e=>onChange({...value,readTime:e.target.value})} />
        <div className='flex items-center gap-3 text-xs px-2'>
          <label className='flex items-center gap-1'><input type='checkbox' checked={!!value.featured} onChange={e=>onChange({...value,featured:e.target.checked})} />Featured</label>
          <label className='flex items-center gap-1'><input type='checkbox' checked={!!value.published} onChange={e=>onChange({...value,published:e.target.checked})} />Published</label>
        </div>
      </div>
    </form>
  );

  const FaqEditForm = ({value,onChange,onCancel,onSubmit}) => (
    <form onSubmit={onSubmit} className='mt-3 space-y-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 p-4 border border-white/10 backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-sm tracking-wide'>{value._id? 'Edit FAQ':'New FAQ'}</h3>
        <div className='flex gap-2'>
          <button type='button' onClick={onCancel} className='text-xs px-2 py-1 rounded bg-gray-600/70 hover:bg-gray-500 transition'>Cancel</button>
          <button type='submit' className='text-xs px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 shadow-sm'>Save</button>
        </div>
      </div>
      <input className='w-full text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Question' value={value.question} onChange={e=>onChange({...value,question:e.target.value})} />
      <textarea className='w-full text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' rows={4} placeholder='Answer' value={value.answer} onChange={e=>onChange({...value,answer:e.target.value})} />
      <div className='grid grid-cols-3 gap-3'>
        <input className='text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Category' value={value.category} onChange={e=>onChange({...value,category:e.target.value})} />
        <input className='text-sm px-3 py-2 rounded bg-white/10 focus:bg-white/15 outline-none' placeholder='Order' type='number' value={value.order} onChange={e=>onChange({...value,order:parseInt(e.target.value)||0})} />
        <label className='flex items-center gap-2 text-xs'><input type='checkbox' checked={!!value.published} onChange={e=>onChange({...value,published:e.target.checked})} />Published</label>
      </div>
    </form>
  );

  const PostRow = ({post}) => {
    const isEditing = editingPost && (editingPost._id === post._id);
    return (
      <li className='rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 border border-white/10 hover:border-purple-400/40 transition group'>
        <div className='flex justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <span className='font-medium truncate'>{post.title}</span>
              {post.featured && <span className='text-[10px] px-2 py-0.5 rounded-full bg-pink-600/60 text-white tracking-wide'>FEATURED</span>}
              {!post.published && <span className='text-[10px] px-2 py-0.5 rounded-full bg-gray-500/60 text-white tracking-wide'>DRAFT</span>}
            </div>
            <div className='text-[11px] text-gray-300 flex flex-wrap gap-3'>
              <span className='uppercase tracking-wide'>{post.category||'uncategorized'}</span>
              {post.author && <span>by {post.author}</span>}
              <span>{(post.readTime)||''}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <button onClick={()=> setEditingPost(isEditing? null : post)} className='p-2 rounded bg-blue-600/80 hover:bg-blue-500 flex items-center justify-center' title={isEditing? 'Close':'Edit'}>
              {isEditing ? (
                <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
              ) : (
                <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l10.586-10.586a2 2 0 000-2.828l-2.172-2.172a2 2 0 00-2.828 0L4.293 14.707A1 1 0 004 15.414V20z'/></svg>
              )}
            </button>
            <button onClick={()=>deletePost(post._id)} className='p-2 rounded bg-red-600/80 hover:bg-red-500 flex items-center justify-center' title='Delete'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0h8m-5-3h2a1 1 0 011 1v2H8V5a1 1 0 011-1h2z'/></svg>
            </button>
          </div>
        </div>
        {isEditing && (
          <PostEditForm
            value={editingPost}
            onChange={v=>setEditingPost(v)}
            onCancel={()=>setEditingPost(null)}
            onSubmit={savePost}
          />
        )}
      </li>
    );
  };

  const FaqRow = ({faq}) => {
    const isEditing = editingFaq && (editingFaq._id === faq._id);
    return (
      <li className='rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 border border-white/10 hover:border-blue-400/40 transition group'>
        <div className='flex justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <span className='font-medium truncate'>{faq.question}</span>
              {!faq.published && <span className='text-[10px] px-2 py-0.5 rounded-full bg-gray-500/60 text-white tracking-wide'>HIDDEN</span>}
            </div>
            <div className='text-[11px] text-gray-300 flex flex-wrap gap-3'>
              <span className='uppercase tracking-wide'>{faq.category||'general'}</span>
              <span>order {faq.order}</span>
              <span>{new Date(faq.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <button onClick={()=> setEditingFaq(isEditing? null : faq)} className='p-2 rounded bg-blue-600/80 hover:bg-blue-500 flex items-center justify-center' title={isEditing? 'Close':'Edit'}>
              {isEditing ? (
                <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
              ) : (
                <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l10.586-10.586a2 2 0 000-2.828l-2.172-2.172a2 2 0 00-2.828 0L4.293 14.707A1 1 0 004 15.414V20z'/></svg>
              )}
            </button>
            <button onClick={()=>deleteFaq(faq._id)} className='p-2 rounded bg-red-600/80 hover:bg-red-500 flex items-center justify-center' title='Delete'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0h8m-5-3h2a1 1 0 011 1v2H8V5a1 1 0 011-1h2z'/></svg>
            </button>
          </div>
        </div>
        {isEditing && (
          <FaqEditForm
            value={editingFaq}
            onChange={v=>setEditingFaq(v)}
            onCancel={()=>setEditingFaq(null)}
            onSubmit={saveFaq}
          />
        )}
      </li>
    );
  };

  return (
    <AdminErrorBoundary>
    <div className='min-h-screen pt-28 pb-20 px-4 md:px-10 bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 text-white'>
      <div className='max-w-7xl mx-auto'>
        <div ref={runtimeErrorRef} className='text-xs text-amber-300 mb-4'></div>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 text-transparent bg-clip-text'>Content Administration</h1>
            <p className='text-sm text-gray-300 mt-2'>Manage blog posts & FAQs. Inline editing, search and quick status visibility.</p>
          </div>

        </div>
        {/* View Switcher */}
        <div className='mb-10 flex justify-center'>
          <div className='relative'>
            <select
              value={view}
              onChange={e=>{ setView(e.target.value); setEditingPost(null); setEditingFaq(null); }}
              className='appearance-none w-72 md:w-96 text-lg font-semibold px-6 py-4 pr-12 rounded-2xl bg-gray-900/70 backdrop-blur border border-white/25 hover:bg-gray-900/80 focus:outline-none focus:ring-4 ring-purple-500/40 shadow-xl text-white tracking-wide'
            >
              <option value='posts' className='text-gray-900'>Blog Posts</option>
              <option value='faqs' className='text-gray-900'>FAQs</option>
              <option value='messages' className='text-gray-900'>Contact Messages</option>
              <option value='analysis' className='text-gray-900'>Analysis Queue</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-4 flex items-center text-purple-200'>
              <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M6 9l6 6 6-6'/></svg>
            </div>
          </div>
        </div>

  {view==='analysis' && (
          <section className='relative mb-14 -mt-4'>
            <header className='flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between'>
              <h2 className='text-xl font-semibold flex items-center gap-3'>
                <span className='w-2 h-2 rounded-full bg-purple-400 animate-pulse'></span> Analysis Requests
              </h2>
              <div className='flex flex-col md:flex-row gap-3 w-full md:w-auto items-stretch md:items-center'>
                <div className='flex gap-3 w-full'>
                  <input value={analysisQuery} onChange={e=>{ setAnalysisQuery(e.target.value); setAnalysisPage(1); loadAnalysis(1,e.target.value,analysisStatusFilter); }} placeholder='Search (url, email, task)...' className='flex-1 md:w-80 px-3 py-2 rounded-lg bg-white/10 text-sm outline-none focus:ring-2 ring-purple-500/50' />
                  <select value={analysisStatusFilter} onChange={e=>{ setAnalysisStatusFilter(e.target.value); setAnalysisPage(1); loadAnalysis(1,analysisQuery,e.target.value); }} className='px-3 py-2 rounded-lg bg-white/10 text-sm outline-none focus:ring-2 ring-purple-500/50 text-white'>
                    <option value='all' className='text-black'>All</option>
                    <option value='queued' className='text-black'>Queued</option>
                    <option value='processing' className='text-black'>Processing</option>
                    <option value='completed' className='text-black'>Completed</option>
                    <option value='failed' className='text-black'>Failed</option>
                  </select>
                </div>
                <button onClick={()=> loadAnalysis(1,analysisQuery,analysisStatusFilter)} className='px-4 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-500 text-xs font-semibold shadow'>Refresh</button>
              </div>
            </header>
            <div className='rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 border border-white/10 max-h-[36rem] overflow-y-auto space-y-4'>
              {analysisRecords.map(rec => (
                <div key={rec._id || rec.taskId} className='p-4 rounded-lg bg-black/30 border border-white/10 hover:border-purple-400/40 transition'>
                  <div className='flex flex-wrap items-center justify-between gap-4'>
                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap gap-2 items-center mb-1'>
                        <span className='font-medium break-all'>{rec.url}</span>
                        <span className='text-xs px-2 py-0.5 rounded-full bg-white/10'>{rec.email}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${rec.status==='completed'?'bg-emerald-600/70': rec.status==='failed'?'bg-red-600/70': rec.status==='processing'?'bg-blue-600/70':'bg-gray-600/60'}`}>{rec.status.toUpperCase()}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${rec.emailStatus==='sent'?'bg-emerald-600/60': rec.emailStatus==='failed'?'bg-red-600/60': rec.emailStatus==='sending'?'bg-blue-600/60':'bg-gray-600/50'}`}>EMAIL {rec.emailStatus.toUpperCase()}</span>
                      </div>
                      <div className='text-[11px] text-gray-300 flex flex-wrap gap-4'>
                        <span>Task: {rec.taskId}</span>
                        <span>Created {new Date(rec.createdAt).toLocaleString()}</span>
                        {rec.reportDirectory && <span className='truncate max-w-xs'>Dir: {rec.reportDirectory}</span>}
                      </div>
                      {rec.emailError && <div className='mt-1 text-[11px] text-red-400'>Email Error: {rec.emailError}</div>}
                    </div>
                    <div className='flex flex-col gap-2 shrink-0'>
                      {rec.email && (
                        <button onClick={async ()=>{
                          if(!window.confirm('Re-run this analysis now?')) return;
                          try {
                            const res = await fetch(`${API_BASE}/admin/analysis/${rec._id}/rerun`, { method:'POST', headers });
                            const data = await res.json();
                            if(!res.ok) { alert(data.error||'Failed to re-queue'); return; }
                            alert('Re-run queued (task '+(data.taskId||data.newTaskId||rec.taskId)+')');
                            loadAnalysis(1, analysisQuery, analysisStatusFilter);
                          } catch(e){ alert('Network error'); }
                        }} className='px-3 py-1.5 rounded bg-purple-600/70 hover:bg-purple-500 text-[11px] font-semibold'>Re-run</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {analysisRecords.length===0 && <div className='text-sm text-gray-400 italic'>No records.</div>}
            </div>
            {analysisTotal > analysisPageSize && (
              <div className='flex items-center justify-center gap-4 mt-4 text-xs'>
                <button disabled={analysisPage<=1} onClick={()=> setAnalysisPage(p=> Math.max(1,p-1))} className='px-3 py-1 rounded bg-white/10 disabled:opacity-30'>Prev</button>
                <span className='text-gray-300'>Page {analysisPage} of {Math.ceil(analysisTotal/analysisPageSize)}</span>
                <button disabled={analysisPage>=Math.ceil(analysisTotal/analysisPageSize)} onClick={()=> setAnalysisPage(p=> p+1)} className='px-3 py-1 rounded bg-white/10 disabled:opacity-30'>Next</button>
              </div>
            )}
          </section>
        )}

        {/* Conditional Panels */}
        {view==='messages' && (
          <section className='relative'>
            <header className='flex flex-col gap-5 mb-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center gap-3'>
                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                <h2 className='text-xl font-semibold'>Contact Messages</h2>
                <span className='text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300'>{messagesTotal} total</span>
              </div>
              <div className='flex flex-col md:flex-row gap-3 w-full md:w-auto items-stretch md:items-center'>
                <div className='flex gap-3 w-full'>
                  <input value={messageQuery} onChange={e=>{ setMessageQuery(e.target.value); loadMessages(1, e.target.value); }} placeholder='Search (name, email, text)...' className='flex-1 md:w-80 px-3 py-2 rounded-lg bg-white/10 text-sm outline-none focus:ring-2 ring-emerald-500/50' />
                  <select value={messageStatusFilter} onChange={e=> setMessageStatusFilter(e.target.value)} className='px-3 py-2 rounded-lg bg-white/10 text-sm outline-none focus:ring-2 ring-emerald-500/50 text-white'>
                    <option value='all' className='text-black'>All</option>
                    <option value='new' className='text-black'>New</option>
                    <option value='viewed' className='text-black'>Viewed</option>
                  </select>
                </div>
                <div className='flex gap-3'>
                  <button onClick={()=>{ loadMessages(1,messageQuery); }} className='px-4 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-xs font-semibold shadow'>Refresh</button>
                </div>
              </div>
            </header>
            <ul className='rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-900/30 border border-white/10 divide-y divide-white/5 overflow-hidden shadow-xl'>
              {filteredMessages.map(msg => {
                const expanded = expandedMessages.has(msg._id);
                return (
                  <li key={msg._id} className='group'>
                    <div className='flex flex-col md:flex-row md:items-start md:gap-6 p-5 hover:bg-white/5 transition'>
                      <div className='flex-1 min-w-0'>
                        <div className='flex flex-wrap items-center gap-2 mb-1'>
                          <button onClick={()=> setExpandedMessages(prev=>{ const n=new Set(prev); n.has(msg._id)? n.delete(msg._id): n.add(msg._id); return n; })} className='p-1 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center'>
                            {expanded ? (
                              <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7'/></svg>
                            ): (
                              <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'/></svg>
                            )}
                          </button>
                          <span className='font-semibold tracking-wide'>{msg.name}</span>
                          <span className='text-xs text-purple-300 break-all'>{msg.email}</span>
                          {msg.business && <span className='text-[10px] px-2 py-0.5 rounded-full bg-white/10'>{msg.business}</span>}
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${msg.status==='new'?'bg-emerald-600/70 text-white': msg.status==='resolved'?'bg-blue-600/60 text-white':'bg-gray-600/60 text-white'}`}>{msg.status.toUpperCase()}</span>
                        </div>
                        <div className='text-sm text-gray-200'>
                          {!expanded && (
                            <span className='line-clamp-1 block opacity-90'>{msg.message}</span>
                          )}
                          {expanded && (
                            <p className='mt-2 whitespace-pre-wrap leading-relaxed'>{msg.message}</p>
                          )}
                        </div>
                        <div className='mt-2 text-[11px] text-gray-400 flex flex-wrap gap-4'>
                          <span>Submitted {new Date(msg.createdAt).toLocaleString()}</span>
                          {msg.viewedAt && <span>Viewed {new Date(msg.viewedAt).toLocaleString()}</span>}
                          {msg.resolvedAt && <span>Resolved {new Date(msg.resolvedAt).toLocaleString()}</span>}
                        </div>
                      </div>
                      <div className='flex md:flex-col gap-2 mt-4 md:mt-0 shrink-0'>
                        {msg.status === 'new' && (
                          <button onClick={()=> updateMessageStatus(msg._id,'viewed')} className='px-3 py-2 rounded bg-blue-600/80 hover:bg-blue-500 text-xs font-semibold'>Mark Viewed</button>
                        )}
                        {/* Resolve action removed from filter UI but kept if statuses appear */}
                        {msg.status !== 'resolved' && false && (
                          <button onClick={()=> updateMessageStatus(msg._id,'resolved')} className='px-3 py-2 rounded bg-emerald-600/80 hover:bg-emerald-500 text-xs font-semibold'>Resolve</button>
                        )}
                        <button onClick={async ()=>{ if(window.confirm('Delete message?')){ await fetch(`${API_BASE}/admin/contact-messages/${msg._id}`, { method:'DELETE', headers }); loadMessages(messagesPage,messageQuery); } }} className='px-3 py-2 rounded bg-red-600/80 hover:bg-red-500 text-xs font-semibold'>Delete</button>
                      </div>
                    </div>
                  </li>
                );
              })}
              {filteredMessages.length===0 && (
                <li className='p-8 text-center text-sm text-gray-400'>No messages.</li>
              )}
            </ul>
            {messagesTotal > pageSize && (
              <div className='flex items-center justify-center gap-4 mt-6 text-xs'>
                <button disabled={messagesPage<=1} onClick={()=> setMessagesPage(p=> Math.max(1,p-1))} className='px-3 py-1 rounded bg-white/10 disabled:opacity-30'>Prev</button>
                <span className='text-gray-300'>Page {messagesPage} of {Math.ceil(messagesTotal/pageSize)}</span>
                <button disabled={messagesPage>=Math.ceil(messagesTotal/pageSize)} onClick={()=> setMessagesPage(p=> p+1)} className='px-3 py-1 rounded bg-white/10 disabled:opacity-30'>Next</button>
              </div>
            )}
          </section>
        )}
        {view!=='messages' && (
          <></>
        )}
  {view==='posts' && (
          <section className='relative mb-14'>
            <header className='flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between'>
              <h2 className='text-xl font-semibold flex items-center gap-3'>
                <span className='w-2 h-2 rounded-full bg-pink-500 animate-pulse'></span> Blog Posts
              </h2>
              <div className='flex gap-3 w-full md:w-auto items-center'>
                <input value={postQuery} onChange={e=>setPostQuery(e.target.value)} placeholder='Search posts...' className='flex-1 md:w-56 px-3 py-2 rounded bg-white/10 text-sm outline-none focus:ring-2 ring-purple-500/40' />
                <button onClick={newPost} className='p-2 rounded bg-green-600/80 hover:bg-green-500 shadow flex items-center justify-center' title='New Post'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4'/></svg>
                </button>
                <button onClick={()=>setShowPosts(s=>!s)} className='p-2 rounded bg-white/10 hover:bg-white/20 text-xs' title='Toggle List'>
                  {showPosts ? (
                    <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
                  ): (
                    <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'/></svg>
                  )}
                </button>
              </div>
            </header>
            {editingPost && !editingPost._id && (
              <div className='mb-4'>
                <PostEditForm
                  value={editingPost}
                  onChange={v=>setEditingPost(v)}
                  onCancel={()=>setEditingPost(null)}
                  onSubmit={savePost}
                />
              </div>
            )}
            {showPosts && (
              <>
                {postsLoading && posts.length===0 && (
                  <div className='space-y-3 animate-pulse'>
                    <div className='h-16 rounded-xl bg-white/5'></div>
                    <div className='h-16 rounded-xl bg-white/5'></div>
                    <div className='h-16 rounded-xl bg-white/5'></div>
                  </div>
                )}
                {!postsLoading && (
                  <ul className='space-y-4 max-h-[36rem] overflow-y-auto pr-1 custom-scrollbar'>
                    {filteredPosts.map(p=> <PostRow key={p._id} post={p} />)}
                    {filteredPosts.length===0 && <li className='text-sm text-gray-400 italic'>No posts match.</li>}
                  </ul>
                )}
              </>
            )}
          </section>
        )}
  {view==='faqs' && (
          <section className='relative'>
            <header className='flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between'>
              <h2 className='text-xl font-semibold flex items-center gap-3'>
                <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></span> FAQs
              </h2>
              <div className='flex gap-3 w-full md:w-auto items-center'>
                <input value={faqQuery} onChange={e=>setFaqQuery(e.target.value)} placeholder='Search FAQs...' className='flex-1 md:w-56 px-3 py-2 rounded bg-white/10 text-sm outline-none focus:ring-2 ring-blue-500/40' />
                <button onClick={newFaq} className='p-2 rounded bg-blue-600/80 hover:bg-blue-500 shadow flex items-center justify-center' title='New FAQ'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4'/></svg>
                </button>
                <button onClick={()=>setShowFaqs(s=>!s)} className='p-2 rounded bg-white/10 hover:bg-white/20 text-xs' title='Toggle List'>
                  {showFaqs ? (
                    <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
                  ): (
                    <svg className='w-4 h-4' viewBox='0 0 24 24' stroke='currentColor' fill='none' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'/></svg>
                  )}
                </button>
              </div>
            </header>
            {editingFaq && !editingFaq._id && (
              <div className='mb-4'>
                <FaqEditForm
                  value={editingFaq}
                  onChange={v=>setEditingFaq(v)}
                  onCancel={()=>setEditingFaq(null)}
                  onSubmit={saveFaq}
                />
              </div>
            )}
            {showFaqs && (
              <>
                {faqsLoading && faqs.length===0 && (
                  <div className='space-y-3 animate-pulse'>
                    <div className='h-14 rounded-xl bg-white/5'></div>
                    <div className='h-14 rounded-xl bg-white/5'></div>
                    <div className='h-14 rounded-xl bg-white/5'></div>
                  </div>
                )}
                {!faqsLoading && (
                  <ul className='space-y-4 max-h-[36rem] overflow-y-auto pr-1 custom-scrollbar'>
                    {filteredFaqs.map(f=> <FaqRow key={f._id} faq={f} />)}
                    {filteredFaqs.length===0 && <li className='text-sm text-gray-400 italic'>No FAQs match.</li>}
                  </ul>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </div>
    </AdminErrorBoundary>
  );
}
