import React from 'react';

const ProfilePage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div className="responsive-container" style={{ maxWidth: 420, margin: '3rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', position: 'relative' }}>
      {/* Icon back ke home */}
      <button onClick={() => window.location.href = '/'} style={{ position: 'absolute', left: 16, top: 16, background: 'none', border: 'none', color: '#FF7043', fontSize: 22, cursor: 'pointer', fontWeight: 700, zIndex: 10 }} aria-label="Kembali ke Home">←</button>
      <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Profil Pengguna</h2>
      {user ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <div style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF7043 60%, #FFD180 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              color: '#fff',
              fontWeight: 700,
              marginBottom: 18
            }}>
              {user.full_name ? user.full_name[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            {user.full_name && (
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{user.full_name}</div>
            )}
            <div style={{ fontSize: 16, color: '#888', marginBottom: 8 }}>{user.email}</div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', background: 'linear-gradient(90deg, #FF7043 60%, #FFD180 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,112,67,0.10)' }}>Logout</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16, textAlign: 'center', color: '#888' }}>Anda belum login.</div>
          <button onClick={() => window.location.href = '/login'} style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: 12 }}>Login</button>
          <button onClick={() => window.location.href = '/register'} style={{ width: '100%', background: '#fff', color: '#FF7043', border: '1.5px solid #FF7043', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Register</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
