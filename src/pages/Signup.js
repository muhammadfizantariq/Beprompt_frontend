import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE, fetchJSON } from '../config/apiBase';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setMessage(null);
    if (!form.email || !form.password) { setError('Email and password required'); return; }
    setLoading(true);
    try {
  const { ok, data, status } = await fetchJSON('/auth/register', { method: 'POST', body: JSON.stringify(form) });
  if (!ok) throw new Error(data?.error || `Registration failed (status ${status})`);
      setMessage('Registration successful. Check your email to verify your account.');
      setTimeout(()=> navigate('/login'), 2500);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 px-4 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="••••••••" autoComplete="new-password" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-300">{message}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p className="text-xs text-center text-gray-300 mt-6">Already have an account? <a href="/login" className="text-purple-300 hover:text-purple-200 underline">Login</a></p>
      </div>
    </div>
  );
}
