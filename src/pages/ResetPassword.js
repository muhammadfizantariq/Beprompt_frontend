import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config/apiBase';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword(){
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [message,setMessage]=useState(null);
  const [valid,setValid]=useState(true);

  useEffect(()=>{ if(!token) { setValid(false); setError('Missing token'); } },[token]);

  const handleSubmit=async(e)=>{
    e.preventDefault(); setError(null); setMessage(null);
    if(!password) { setError('Password required'); return; }
    setLoading(true);
    try {
  const res = await fetch(`${API_BASE}/auth/reset-password`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token, password })});
  const text = await res.text(); let data; try { data = text? JSON.parse(text):{}; } catch { throw new Error(text.startsWith('<')? 'Unexpected HTML from server. Check API base URL.' : 'Invalid JSON response'); }
      if(!res.ok) throw new Error(data.error || 'Failed');
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(()=> navigate('/login'), 2000);
    } catch(err){ setError(err.message);} finally { setLoading(false);} 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 px-4 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Reset Password</h1>
        {!valid && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        {valid && <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">New Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-300">{message}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed">{loading? 'Resetting...' : 'Reset Password'}</button>
        </form>}
        <p className="text-xs text-center text-gray-300 mt-6"><a href="/login" className="text-purple-300 hover:text-purple-200 underline">Back to login</a></p>
      </div>
    </div>
  );
}
