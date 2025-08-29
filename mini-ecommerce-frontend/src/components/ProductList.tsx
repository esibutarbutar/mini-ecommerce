import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { Product, Store } from '../types';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
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

    // Fetch products saat store dipilih dan reset quantities
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
                setQuantities({}); // reset quantities setiap ganti toko
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

    // Hitung total item dan total harga
    const totalItem = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalPrice = products.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.price, 0);
    // const navigate = useNavigate(); // Sudah dideklarasikan di atas

    // Data basket yang akan dikirim ke halaman detail
    const basket = products
        .filter(p => (quantities[p.id] || 0) > 0)
        .map(p => ({ product: p, quantity: quantities[p.id] }));

    // Handler untuk update quantity dari ProductItem
    const handleQuantityChange = (productId: string, qty: number) => {
        setQuantities(q => ({ ...q, [productId]: qty }));
    };

    return (
        <div className="product-list" style={{ position: 'relative' }}>
            <span
                onClick={() => setSelectedStore(null)}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    fontSize: '2rem',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    zIndex: 10,
                    color: '#FF7043',
                    userSelect: 'none',
                }}
                title="Kembali ke daftar toko"
            >
                ←
            </span>
            <div style={{ height: '2.5rem' }} />
            {products.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] || 0}
                    onQuantityChange={qty => handleQuantityChange(product.id, qty)}
                />
            ))}
            {totalItem > 0 && (
                <button
                    style={{
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        width: '100vw',
                        background: '#FF7043',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 0,
                        padding: '1.1rem 0',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        zIndex: 1000,
                        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)'
                    }}
                    onClick={() => navigate('/basket', { state: { basket } })}
                >
                    🧺 Basket: {totalItem} &nbsp; | &nbsp; Price Rp: {totalPrice.toLocaleString('id-ID')}
                </button>
            )}
        </div>
    );
};

export default ProductList;