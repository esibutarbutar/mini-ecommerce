import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?page=${page}&filter=${filter}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
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
    }, [page, filter]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
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
            <input
                type="text"
                placeholder="Filter products"
                value={filter}
                onChange={handleFilterChange}
            />
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;