import React from 'react';
import { Product } from '../types';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
    <div className="product-item">
        <h3>{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* Tambahkan tombol/tindakan lain jika perlu */}
    </div>
);

export default ProductItem;