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
  // Ambil basket dari navigation state atau localStorage
  let basket: BasketItem[] = (location.state as { basket?: BasketItem[] })?.basket || [];
  if (basket.length === 0) {
    try {
      const saved = localStorage.getItem('basket');
      if (saved) basket = JSON.parse(saved);
    } catch {}
  }

  const total = basket.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    // Validasi jumlah produk
    if (basket.length === 0) {
      setError('Pilih minimal 1 produk untuk checkout.');
      return;
    }
    // Cek login user
    const user = localStorage.getItem('user');
    if (!user) {
      // Simpan basket ke localStorage sebelum redirect login
      localStorage.setItem('basket', JSON.stringify(basket));
      navigate('/login', { state: { from: '/basket' } });
      return;
    } else {
      // Hapus basket dari localStorage setelah login sukses
      localStorage.removeItem('basket');
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/historycheckout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ items: basket, total })
      });
      if (!res.ok) throw new Error('Checkout gagal');
      setTimeout(() => {
        setLoading(false);
        navigate('/success');
      }, 800);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
  <div className="responsive-container basket-detail-page" style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
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
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {basket.length > 0 && (
        <button onClick={handleCheckout} disabled={loading} style={{ marginTop: 24, width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', position: 'relative' }}>
          {loading ? (
            <span>
              <span className="spinner" style={{ marginRight: 8, width: 18, height: 18, border: '3px solid #fff', borderTop: '3px solid #FF7043', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite', verticalAlign: 'middle' }} />
              Memproses...
            </span>
          ) : 'Checkout'}
        </button>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BasketDetailPage;
