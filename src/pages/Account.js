import React, { useEffect, useState, useRef } from 'react';
import { API_BASE, fetchJSON } from '../config/apiBase';
import { Link } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const pollRef = useRef(null);

  function formatTime(ts){
    if(!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString();
  }

  function statusBadge(status){
    const map = {
      queued: 'bg-yellow-600/30 text-yellow-200',
      processing: 'bg-blue-600/30 text-blue-200',
      completed: 'bg-green-600/30 text-green-200',
      failed: 'bg-red-600/30 text-red-200'
    };
    const cls = map[status] || 'bg-gray-600/30 text-gray-200';
    return <span className={`text-xs px-2 py-1 rounded ${cls}`}>{status}</span>;
  }

  function emailBadge(status){
    const map = {
      pending: 'bg-yellow-500/20 text-yellow-200',
      sending: 'bg-blue-500/20 text-blue-200',
      sent: 'bg-green-500/20 text-green-200',
      failed: 'bg-red-500/20 text-red-200'
    };
    const cls = map[status] || 'bg-gray-500/20 text-gray-200';
    return <span className={`text-[10px] px-2 py-0.5 rounded ${cls}`}>email: {status}</span>;
  }

  // Removed loadStatuses – now relying purely on DB persistence (/my-analyses)

  async function loadPersisted(token, pageToLoad = 1){
    try {
      const res = await fetch(`${API_BASE}/my-analyses?page=${pageToLoad}&pageSize=20`, { headers: { Authorization: 'Bearer '+token } });
      const data = await res.json();
      if(data.success){
        setHasMore(data.hasMore);
        setPage(data.page);
        setJobs(prev => {
          const base = pageToLoad === 1 ? [] : prev; // reset list if first page
          const map = new Map();
          [...base, ...data.analyses].forEach(t => { map.set(t.taskId || t._id, { ...t, taskId: t.taskId || t._id }); });
          return Array.from(map.values()).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        });
      }
    } catch(e){ /* ignore */ }
  }

  useEffect(() => {
    let ignore=false;
    (async () => {
      try {
        const token = localStorage.getItem('authToken');
        if(!token){ setError('Not authenticated'); setLoading(false); return; }
        const { ok, data } = await fetchJSON('/auth/me', { headers: { Authorization: 'Bearer '+token } });
        if (!ignore) {
          if(!ok) throw new Error(data?.error || 'Failed to load user');
          setUser(data.user);
        }
        if(!ignore && data?.user?.email){
          await loadPersisted(token, 1);
          // Poll DB every 15s for updated statuses (DB is source of truth)
          pollRef.current = setInterval(()=> loadPersisted(token, 1), 15000);
        }
      } catch(e){ if(!ignore) setError(e.message); } finally { if(!ignore) setLoading(false); }
    })();
    return ()=>{ignore=true; if(pollRef.current) clearInterval(pollRef.current);};
  }, []);

  async function loadMore(){
    if(loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const token = localStorage.getItem('authToken');
      if(!token) return;
      await loadPersisted(token, page + 1);
    } finally {
      setLoadingMore(false);
    }
  }

  function logout(){
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white px-4">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {user && (
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-purple-200">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
              <p className="text-xs mt-1">Status: {user.verified ? <span className="text-green-400">Verified</span> : <span className="text-yellow-300">Unverified</span>}</p>
              {!user.verified && <Link to="/resend-verification" className="text-xs text-purple-300 underline">Resend verification</Link>}
            </div>
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-2">Recent Analyses</h2>
              {jobs.length === 0 && <p className="text-sm text-gray-300">No analyses yet. Once you start an analysis you will see live status here.</p>}
              <ul className="divide-y divide-white/10">
                {jobs.map(task => (
                  <li key={task.taskId} className="py-3">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium break-all">{task.url}</p>
                        <div className="flex flex-wrap gap-2 mt-1 items-center">
                          {statusBadge(task.status)}
                          {emailBadge(task.emailStatus)}
                          <span className="text-[10px] text-gray-400">{formatTime(task.createdAt)}</span>
                        </div>
                        {task.emailError && <p className="text-[10px] text-red-300 mt-1">Email error: {task.emailError}</p>}
                      </div>
                      {task.reportDirectory && task.emailStatus==='sent' && (
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400">Reports folder:</p>
                          <p className="text-[10px] text-purple-200 break-all max-w-[160px]">{task.reportDirectory}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <div className="mt-4 flex justify-center">
                  <button onClick={loadMore} disabled={loadingMore} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs disabled:opacity-50">
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
            <div className="pt-6 flex gap-4">
              <button onClick={logout} className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white text-sm font-semibold">Logout</button>
              <Link to="/services" className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Run Analysis</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
