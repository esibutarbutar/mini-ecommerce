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
      <button
        onClick={() => navigate('/history')}
        style={{ background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
      >
        History
      </button>
    </header>
  );
};

export default Header;