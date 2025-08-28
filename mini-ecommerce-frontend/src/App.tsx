import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;