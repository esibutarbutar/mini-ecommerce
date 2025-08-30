import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@gmail\.com$/.test(email)) {
      setError('Email harus menggunakan domain @gmail.com');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    setError(null);
    // Simulasi register ke backend
    try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });
      if (!res.ok) throw new Error('Email sudah terdaftar atau error server');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
  <div className="responsive-container register-page" style={{ maxWidth: 400, margin: '3rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', position: 'relative' }}>
      {/* Icon/tombol back */}
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', left: 16, top: 16, background: 'none', border: 'none', color: '#FF7043', fontSize: 22, cursor: 'pointer', fontWeight: 700 }}
        aria-label="Kembali ke Home"
      >
        ←
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="fullName" style={{ display: 'block', marginBottom: 6 }}>Nama Lengkap</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #eee' }}
            required
          />
        </div>
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
        {success && <div style={{ color: 'green', marginBottom: 12 }}>Registrasi berhasil! Redirect ke login...</div>}
        <button type="submit" style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        Sudah punya akun? <span style={{ color: '#FF7043', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
      </div>
    </div>
  );
};

export default RegisterPage;
