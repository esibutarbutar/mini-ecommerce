
import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import BasketDetailPage from './pages/BasketDetailPage';
import HistoryPage from './pages/HistoryPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import StoresPage from './pages/StoresPage';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/basket" element={<BasketDetailPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/success" element={<OrderSuccessPage />} />
    </Routes>
  </Router>
);

export default App;