import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { Product, Store } from '../types';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    // Ambil kategori unik dari produk
    const categories = useMemo(() => Array.from(new Set(products.map(p => p.category).filter(Boolean))), [products]);
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



    // (Sudah dideklarasikan di atas sebelum filterUI)

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    // const [minPrice, setMinPrice] = useState<string>('');
    // const [maxPrice, setMaxPrice] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

    // (Sudah dideklarasikan di atas sebelum filterUI)

    // Filter UI
    const filterUI = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            margin: '1rem 0 2rem 0',
        }}>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #eee', minWidth: 180, marginBottom: 8 }}>
                <option value="">Semua Kategori</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                style={{ padding: 8, borderRadius: 8, border: '1px solid #eee', background: '#FF7043', color: '#fff', fontWeight: 'bold', cursor: 'pointer', minWidth: 180 }}
            >
                Sort Harga: {sortOrder === 'asc' ? 'Termurah' : 'Termahal'}
            </button>
        </div>
    );


    // --- OPTIMIZATION HOOKS (must be before any return) ---
    const [debouncedCategory, setDebouncedCategory] = useState(selectedCategory);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedCategory(selectedCategory), 300);
        return () => clearTimeout(handler);
    }, [selectedCategory]);
    const filteredProducts = useMemo(() => {
        let result = products;
        if (debouncedCategory) {
            result = result.filter(p => p.category === debouncedCategory);
        }
        return result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }, [products, debouncedCategory, sortOrder]);

    if (!selectedStore) {
        return (
            <div>
                <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>Recommendation For You</h2>
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
                            onClick={() => setSelectedStore(store.id)}
                            style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                width: '230px',
                                minHeight: '300px',
                                padding: '1.5rem 1rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                border: '1px solid #eee',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
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
                            <div style={{ margin: '0.25rem 0' }}>
                                {store.rating !== undefined && (
                                    <span style={{ color: '#FFD600', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {Array.from({ length: 5 }).map((_, i) =>
                                            i < Math.round(store.rating ?? 0) ? '★' : '☆'
                                        )}
                                        <span style={{ color: '#888', fontWeight: 'normal', fontSize: '0.95em', marginLeft: 6 }}>
                                            {store.rating?.toFixed(1)}
                                        </span>
                                    </span>
                                )}
                            </div>
                            {store.address && <p style={{ fontSize: '0.95em', color: '#888', margin: 0 }}>{store.address}</p>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Hitung total item dan total harga
    const totalItem = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalPrice = products.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.price, 0);

    // Data basket yang akan dikirim ke halaman detail
    const basket = products
        .filter(p => (quantities[p.id] || 0) > 0)
        .map(p => ({ product: p, quantity: quantities[p.id] }));

    // Handler untuk update quantity dari ProductItem
    const handleQuantityChange = (productId: string, qty: number) => {
        setQuantities(q => ({ ...q, [productId]: qty }));
    };

    // (Sudah dideklarasikan di atas sebelum filterUI)


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
            {/* Filter UI */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                margin: '1.5rem 0 2.5rem 0',
                width: '100%',
                flexWrap: 'wrap',
            }}>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        border: '1.5px solid #FF7043',
                        minWidth: 200,
                        fontSize: '1rem',
                        background: '#fff7f3',
                        color: '#FF7043',
                        fontWeight: 600,
                        outline: 'none',
                        boxShadow: '0 1px 4px rgba(255,112,67,0.07)',
                        transition: 'border 0.2s',
                    }}
                >
                    <option value="">Semua Kategori</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    style={{
                        padding: '10px 22px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#FF7043',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(255,112,67,0.10)',
                        transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#ff5722')}
                    onMouseOut={e => (e.currentTarget.style.background = '#FF7043')}
                >
                    {sortOrder === 'asc' ? 'Sort: Termurah ▼' : 'Sort: Termahal ▲'}
                </button>
            </div>
            {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem', fontSize: '1.1rem' }}>
                    Belum ada product
                </div>
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
                    {filteredProducts.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            quantity={quantities[product.id] || 0}
                            onQuantityChange={qty => handleQuantityChange(product.id, qty)}
                        />
                    ))}
                </div>
            )}
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