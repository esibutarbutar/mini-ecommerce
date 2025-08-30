import React, { useEffect, useState } from 'react';
import { Order } from '../types';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="responsive-container" style={{ maxWidth: 600, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Daftar Pesanan</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map(order => (
          <li key={order.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <b>{order.name}</b> - {order.email} - Total: Rp {order.total.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;