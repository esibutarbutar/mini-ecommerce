import React from 'react';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <div className="product-item">
    <img src={product.imageUrl} alt={product.name} loading="lazy" />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p className="price">Rp {product.price.toLocaleString()}</p>
    <button className="button-primary">Pesan Sekarang</button>
  </div>
);

export default ProductItem;