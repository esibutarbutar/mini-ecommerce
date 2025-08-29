import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { Product, Store } from '../types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStore, setSelectedStore] = useState<string | null>(null);

    // Fetch stores saat komponen mount
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/api/stores');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStores(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStores();
    }, []);

    // Fetch products saat store dipilih
    useEffect(() => {
        if (!selectedStore) return;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/api/products?store_id=${selectedStore}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedStore]);

    if (!selectedStore) {
        return (
            <div>
                <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>Pilih Toko</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                    {stores.map(store => (
                        <div
                            key={store.id}
                            onClick={() => setSelectedStore(store.id)}
                            style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                width: '240px',
                                padding: '1.5rem 1rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                border: '1px solid #eee',
                            }}
                            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,112,67,0.15)')}
                            onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)')}
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
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="product-list">
            <button onClick={() => setSelectedStore(null)} style={{ marginBottom: '16px' }}>← Kembali ke daftar toko</button>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;