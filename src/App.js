import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Success from './pages/Success';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerification from './pages/ResendVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import AdminContentManager from './pages/AdminContentManager';
import './App.css';

// Track last non-auth route for post-login redirection
import { useEffect } from 'react';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    const authPaths = new Set(['/login','/signup','/verify-email','/resend-verification','/forgot-password','/reset-password']);
    if(!authPaths.has(location.pathname)) {
      try { localStorage.setItem('lastRoute', location.pathname + location.search); } catch {}
    }
  }, [location]);
  return null;
}

function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function AdminRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const location = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.role !== 'admin') return <Navigate to="/" replace />;
  } catch { return <Navigate to="/login" replace />; }
  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
  <RouteTracker />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><Navigate to="/admin/content" replace /></AdminRoute>} />
            <Route path="/admin/content" element={<AdminRoute><AdminContentManager /></AdminRoute>} />
             <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
