import React from 'react';
import { Product } from '../types';

interface ProductItemProps {
    product: Product;
    quantity: number;
    onQuantityChange: (qty: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, quantity, onQuantityChange }) => {
    const handleAdd = () => onQuantityChange(quantity + 1);
    const handleSubtract = () => onQuantityChange(quantity > 0 ? quantity - 1 : 0);

    return (
        <div
            className="product-item"
            style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                width: '230px',
                minHeight: '340px',
                padding: '1.2rem 1rem 1.5rem 1rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '0 auto',
            }}
        >
            <div style={{ width: '100%', marginBottom: '1rem' }}>
                <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.7rem' }}
                />
                <h3 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>{product.name}</h3>
                <p style={{ fontSize: '0.97em', color: '#888', margin: 0 }}>{product.description}</p>
                <p style={{ fontWeight: 'bold', color: '#FF7043', margin: '0.5rem 0 0 0' }}>Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                <button onClick={handleSubtract} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#f7f7f7', color: '#FF7043', fontWeight: 'bold', cursor: 'pointer' }}>-</button>
                <span style={{ margin: '0 1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>{quantity}</span>
                <button onClick={handleAdd} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#f7f7f7', color: '#FF7043', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
            </div>
        </div>
    );
};

export default ProductItem;