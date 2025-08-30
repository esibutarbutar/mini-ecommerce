import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="responsive-container" style={{ maxWidth: 400, margin: '4rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: 64, color: '#4BB543', marginBottom: 24 }}>✔️</div>
      <h2>Pesanan Berhasil!</h2>
      <p>Terima kasih, pesanan kamu sudah diterima.</p>
      <button
        onClick={() => navigate('/history')}
        style={{ marginTop: 24, background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Lihat History Checkout
      </button>
    </div>
  );
};

export default OrderSuccessPage;
