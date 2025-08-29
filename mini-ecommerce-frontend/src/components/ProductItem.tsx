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
        <div className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.image_url} alt={product.name} />
            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                <button onClick={handleSubtract} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>-</button>
                <span style={{ margin: '0 1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>{quantity}</span>
                <button onClick={handleAdd} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>+</button>
            </div>
        </div>
    );
};

export default ProductItem;