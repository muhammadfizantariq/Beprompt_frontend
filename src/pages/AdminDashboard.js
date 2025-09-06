import React, { useEffect, useState } from 'react';
import { API_BASE, fetchJSON } from '../config/apiBase';

export default function AdminDashboard(){
  const [user,setUser]=useState(null);
  const [error,setError]=useState(null);
  const [analyses,setAnalyses]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    let ignore=false;
    (async()=>{
      try{
        const token = localStorage.getItem('authToken');
        if(!token){ setError('No auth'); return; }
        const { ok, data } = await fetchJSON('/auth/me', { headers: { Authorization: 'Bearer '+token } });
        if(!ok) throw new Error(data?.error||'Auth failed');
        if(data.user.role !== 'admin') throw new Error('Not admin');
        setUser(data.user);
        // fetch last 100 analyses (public admin view) using existing endpoint per user - placeholder future dedicated endpoint
        const res = await fetch(`${API_BASE}/analysis-status?email=${encodeURIComponent(data.user.email)}`);
        const js = await res.json();
        if(js.success){ setAnalyses(js.tasks); }
      }catch(e){ setError(e.message);} finally { if(!ignore) setLoading(false);} }
    )();
    return ()=>{ignore=true};
  },[]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white px-4">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {user && <p className="text-sm mb-6">Logged in as <span className="font-semibold">{user.email}</span> (role: {user.role})</p>}
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Tasks (Your email scope)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-purple-200">
                <tr>
                  <th className="py-2 pr-4">Task ID</th>
                  <th className="py-2 pr-4">URL</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Email Status</th>
                  <th className="py-2 pr-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {analyses.map(a => (
                  <tr key={a.taskId} className="hover:bg-white/5">
                    <td className="py-2 pr-4 font-mono text-[11px]">{a.taskId}</td>
                    <td className="py-2 pr-4 break-all max-w-xs">{a.url}</td>
                    <td className="py-2 pr-4">{a.status}</td>
                    <td className="py-2 pr-4">{a.emailStatus}</td>
                    <td className="py-2 pr-4 text-[11px]">{a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}</td>
                  </tr>
                ))}
                {analyses.length===0 && !loading && <tr><td colSpan={5} className="py-6 text-center text-gray-400">No tasks</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
