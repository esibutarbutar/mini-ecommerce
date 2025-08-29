import React from 'react';
import { Product } from '../types';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    console.log('Product:', product); // Tambahkan ini
    return (
        <div className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.image_url} alt={product.name} />
        </div>
    );
};

export default ProductItem;