import React from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
    return (
        <div className="responsive-container">
            <h1 style={{ fontSize: '2rem', textAlign: 'center', margin: '1.5rem 0 0.5rem 0' }}>Welcome to Our Mini E-Commerce Store</h1>
            <p style={{ textAlign: 'center', marginBottom: 24 }}>Discover our range of products and enjoy shopping!</p>
            <ProductList />
        </div>
    );
};

export default Home;