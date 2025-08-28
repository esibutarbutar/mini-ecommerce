import React, { useEffect, useState, useCallback } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types';

// Debounce helper
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('asc');

    const debouncedFilter = useDebounce(filter, 400);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    filter: debouncedFilter,
                    category,
                    sort,
                });
                const response = await fetch(`/api/products?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products || data); // backend bisa return {products:[]} atau []
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unknown error');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, debouncedFilter, category, sort]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setPage(1);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
        setPage(1);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Cari menu catering..."
                    value={filter}
                    onChange={handleFilterChange}
                    style={{ flex: 1, minWidth: 180 }}
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Semua Kategori</option>
                    <option value="nasi">Nasi</option>
                    <option value="snack">Snack</option>
                    <option value="minuman">Minuman</option>
                </select>
                <select value={sort} onChange={handleSortChange}>
                    <option value="asc">Harga Termurah</option>
                    <option value="desc">Harga Termahal</option>
                </select>
            </div>
            <div className="product-list">
                {products.length === 0 ? (
                    <p>Tidak ada produk ditemukan.</p>
                ) : (
                    products.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))
                )}
            </div>
            <div className="pagination" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span style={{ margin: '0 1rem' }}>Halaman {page}</span>
                <button onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;