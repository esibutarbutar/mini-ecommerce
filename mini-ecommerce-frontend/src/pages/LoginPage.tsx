import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@gmail\.com$/.test(email)) {
      setError('Email harus menggunakan domain @gmail.com');
      return;
    }
    if (!password) {
      setError('Password wajib diisi');
      return;
    }
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Login gagal');
      }
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate(from, { replace: true });
    } catch (e: any) {
      setError(e.message || 'Login gagal');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', position: 'relative' }}>
      <span
        onClick={() => navigate('/')}
        style={{ position: 'absolute', left: 16, top: 16, fontSize: '1.7rem', color: '#FF7043', cursor: 'pointer', fontWeight: 'bold', zIndex: 2 }}
        title="Kembali ke Beranda"
      >
        ←
      </span>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #eee' }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #eee' }}
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        Belum punya akun?{' '}
        <span
          style={{ color: '#FF7043', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => navigate('/register')}
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
