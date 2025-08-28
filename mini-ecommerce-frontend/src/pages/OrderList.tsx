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
    <div>
      <h2>Daftar Pesanan</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <b>{order.name}</b> - {order.email} - Total: Rp {order.total.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;