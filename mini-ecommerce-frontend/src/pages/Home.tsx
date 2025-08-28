import React from 'react';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Our Mini E-Commerce Store</h1>
            <p>Discover our range of products and enjoy shopping!</p>
            <ProductList />
        </div>
    );
};

export default Home;