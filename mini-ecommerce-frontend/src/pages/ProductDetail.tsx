import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = React.useState<Product | null>(null);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

   

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="responsive-container" style={{ maxWidth: 500, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', margin: '2rem auto' }}>
            <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: 18 }}>{product.name}</h1>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12, marginBottom: 18 }} />
            <p style={{ marginBottom: 12 }}>{product.description}</p>
            <p style={{ color: '#FF7043', fontWeight: 700, fontSize: 18, textAlign: 'right' }}>Price: ${product.price}</p>
        </div>
    );
};

export default ProductDetail;