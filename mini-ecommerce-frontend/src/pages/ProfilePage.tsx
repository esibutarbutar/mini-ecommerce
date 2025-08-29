import React from 'react';

const ProfilePage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Profil</h2>
      {user ? (
        <>
          <div style={{ marginBottom: 16 }}><b>Email:</b> {user.email}</div>
          <button onClick={handleLogout} style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>Anda belum login.</div>
          <button onClick={() => window.location.href = '/login'} style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: 12 }}>Login</button>
          <button onClick={() => window.location.href = '/register'} style={{ width: '100%', background: '#fff', color: '#FF7043', border: '1.5px solid #FF7043', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Register</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
