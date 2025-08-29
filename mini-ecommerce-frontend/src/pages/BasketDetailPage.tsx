import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface BasketItem {
  product: Product;
  quantity: number;
}

const BasketDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const basket: BasketItem[] = (location.state as { basket?: BasketItem[] })?.basket || [];

  const total = basket.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', fontSize: '1.2rem', background: 'none', border: 'none', color: '#FF7043', cursor: 'pointer' }}>← Kembali</button>
      <h2>Detail Basket</h2>
      {basket.length === 0 ? (
        <p>Belum ada item yang dipilih.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {basket.map(item => (
            <li key={item.product.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.product.image_url} alt={item.product.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                <div>
                  <b>{item.product.name}</b>
                  <div>Qty: {item.quantity}</div>
                  <div>Harga: Rp {item.product.price.toLocaleString('id-ID')}</div>
                  <div style={{ color: '#FF7043', fontWeight: 'bold' }}>Subtotal: Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3 style={{ textAlign: 'right', marginTop: '2rem' }}>Total: Rp {total.toLocaleString('id-ID')}</h3>
    </div>
  );
};

export default BasketDetailPage;
