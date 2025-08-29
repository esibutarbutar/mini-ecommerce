import React from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = React.useState<Product | null>(null);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
    if (product) {
        addToCart({
            id: Number(product.id), 
            product: product,
            quantity: 1
        });
    }
};

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image_url} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;