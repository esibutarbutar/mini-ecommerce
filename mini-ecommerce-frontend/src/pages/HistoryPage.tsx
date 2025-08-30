import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: number;
  items: any[];
  total: number;
  created_at: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Anda belum login');
      setHistory([]); // kosongkan history jika tidak login
      setLoading(false);
      return;
    }
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const headers: any = { Authorization: `Bearer ${token}` };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/historycheckout`, { headers });
        if (!res.ok) throw new Error('Gagal fetch history');
        const data = await res.json();
        setHistory(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
  <div className="responsive-container" style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
  <button onClick={() => navigate('/')} style={{ marginBottom: '1rem', fontSize: '1.2rem', background: 'none', border: 'none', color: '#FF7043', cursor: 'pointer' }}>← Kembali</button>
      <h2>History Checkout</h2>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.length === 0 ? <li>Tidak ada history.</li> : history.map(item => (
            <li key={item.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div><b>Tanggal:</b> {new Date(item.created_at).toLocaleString('id-ID')}</div>
              <div><b>Total:</b> Rp {item.total.toLocaleString('id-ID')}</div>
              <div>
                <b>Items:</b>
                <ul>
                  {item.items.map((it: any, idx: number) => (
                    <li key={idx}>{it.product.name} x {it.quantity} (Rp {it.product.price.toLocaleString('id-ID')})</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
