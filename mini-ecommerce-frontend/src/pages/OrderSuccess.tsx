import React from 'react';

const OrderSuccess: React.FC = () => (
  <div className="responsive-container" style={{ maxWidth: 400, margin: '4rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2.5rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '1.5rem', marginBottom: 18 }}>Pesanan Berhasil!</h1>
    <p style={{ marginBottom: 18 }}>Terima kasih telah berbelanja</p>
  </div>
);

export default OrderSuccess;