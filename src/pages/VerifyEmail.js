import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function VerifyEmail(){
  const [params] = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    async function run(){
      if(!token){ setStatus('error'); setMessage('Missing token'); return; }
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE || ''}/auth/verify-email`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token }) });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || 'Verification failed');
        setStatus('success'); setMessage('Email verified. You can now login.');
      } catch(err){ setStatus('error'); setMessage(err.message); }
    }
    run();
  },[token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 px-4 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Email Verification</h1>
        {status === 'verifying' && <p className="text-gray-200">Verifying...</p>}
        {status !== 'verifying' && <p className={status==='success'? 'text-green-300':'text-red-400'}>{message}</p>}
        {status === 'success' && <a href="/login" className="inline-block mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold">Go to Login</a>}
        {status === 'error' && <a href="/resend-verification" className="inline-block mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold">Resend Verification</a>}
      </div>
    </div>
  );
}
