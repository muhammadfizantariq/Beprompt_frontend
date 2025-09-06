import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE, fetchJSON } from '../config/apiBase';

// Simple JWT auth simulation: expects backend to provide /api/login returning {token}
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/checkout';
  // Auto-admin redirect handled after token decode; no manual admin mode toggle.

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleReady, setGoogleReady] = useState(false);
  const googleDivRef = useRef(null);
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return; // no client id configured
    const existing = document.getElementById('google-identity-script');
    if (existing) { initGoogle(); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-identity-script';
    script.onload = () => initGoogle();
    script.onerror = () => setError('Failed to load Google auth');
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GOOGLE_CLIENT_ID]);

  function initGoogle() {
    if (!window.google || !googleDivRef.current) return;
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: 'popup'
      });
      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        shape: 'rectangular'
      });
      setGoogleReady(true);
    } catch (e) {
      setError('Google init error');
    }
  }

  async function handleGoogleResponse(resp) {
    if (!resp.credential) { setError('Google auth failed'); return; }
    setLoading(true);
    setError(null);
    try {
      const { ok, data } = await fetchJSON('/auth/google', { method: 'POST', body: JSON.stringify({ idToken: resp.credential }) });
      if (!ok || !data.token) throw new Error(data?.error || 'Google login failed');
      localStorage.setItem('authToken', data.token);
  try { const payload = JSON.parse(atob(data.token.split('.')[1])); if(payload.role==='admin'){ navigate('/admin', { replace: true }); return; } } catch {}
  navigate(redirectTo, { replace: true });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError('Email and password required');
      return;
    }
    setLoading(true);
    try {
      const { ok, data } = await fetchJSON('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      if (!ok || !data.token) throw new Error(data?.error || 'Login failed');
      localStorage.setItem('authToken', data.token);
  try { const payload = JSON.parse(atob(data.token.split('.')[1])); if(payload.role==='admin'){ navigate('/admin', { replace: true }); return; } } catch {}
  navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 px-4 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
  <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
  <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder=""
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder=""
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
          {/* Admin button removed. Admins auto-redirect after successful login or if already logged in. */}
          {GOOGLE_CLIENT_ID && (
            <div className="pt-2">
              <div ref={googleDivRef} className="flex justify-center" />
              {!googleReady && <p className="text-xs text-gray-400 mt-2 text-center">Loading Google sign-in…</p>}
            </div>
          )}
        </form>
        <div className="text-xs text-center text-gray-300 mt-6 space-y-2">
          <p>Enter your credentials to continue.</p>
          <p>
            <a href="/forgot-password" className="text-purple-300 hover:text-purple-200 underline mr-4">Forgot password?</a>
            <a href="/signup" className="text-purple-300 hover:text-purple-200 underline">Create account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
