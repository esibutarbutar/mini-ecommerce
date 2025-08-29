import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 }}>
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