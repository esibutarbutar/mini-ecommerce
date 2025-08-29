import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../types';

const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/stores');
        if (!response.ok) throw new Error('Gagal fetch stores');
        const data = await response.json();
        setStores(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem', fontSize: '1.2rem', background: 'none', border: 'none', color: '#FF7043', cursor: 'pointer' }}>← Kembali</button>
  <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>Recommendation For You</h2>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <span className="spinner" style={{ width: 32, height: 32, border: '4px solid #eee', borderTop: '4px solid #FF7043', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
          <div style={{ marginTop: 16 }}>Loading...</div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            justifyItems: 'center',
            margin: '0 auto',
            maxWidth: '1100px',
          }}
        >
          {stores.map(store => (
            <div
              key={store.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                width: '230px',
                minHeight: '300px',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {store.image_url && (
                <img
                  src={store.image_url}
                  alt={store.name}
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
                />
              )}
              <h3 style={{ margin: '0.5rem 0 0.25rem 0' }}>{store.name}</h3>
              {store.address && <p style={{ fontSize: '0.95em', color: '#888', margin: 0 }}>{store.address}</p>}
              {store.rating !== undefined && (
                <div style={{ margin: '0.5rem 0 0 0' }}>
                  <span style={{ color: '#FFD600', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < Math.round(store.rating ?? 0) ? '★' : '☆'
                    )}
                    <span style={{ color: '#888', fontWeight: 'normal', fontSize: '0.95em', marginLeft: 6 }}>
                      {store.rating?.toFixed(1)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoresPage;
