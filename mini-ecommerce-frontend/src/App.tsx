import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import BasketDetailPage from './pages/BasketDetailPage';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/basket" element={<BasketDetailPage />} />
    </Routes>
  </Router>
);

export default App;