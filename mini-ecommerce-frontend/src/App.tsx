import React from 'react';
import Header from './components/Header'; 
import ProductList from './components/ProductList';
import './styles/main.css';

const App: React.FC = () => (
  <>
    <Header />
    <ProductList />
  </>
);

export default App;