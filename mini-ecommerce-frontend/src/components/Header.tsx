import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 24,
        backgroundImage: 'url(https://seroja.id/wp-content/uploads/2023/09/catering-adalah-1024x683.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 160,
        color: '#fff',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>Catering Lezat</h1>
        <p style={{ margin: 0 }}>Menu Sehat & Praktis untuk Setiap Hari</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => navigate('/history')}
          style={{ background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          History
        </button>
        <span
          onClick={() => navigate('/profile')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            border: '2px solid #fff',
            transition: 'background 0.2s',
          }}
          title="Profil"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.5 4-4 8-4s8 1.5 8 4"/></svg>
        </span>
      </div>
    </header>
  );
};

export default Header;