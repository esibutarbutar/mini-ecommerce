import React from 'react';
import useCart from '../hooks/useCart';
import { CartItem } from '../types';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const handleRemove = (id: number) => {
        removeFromCart(id);
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        updateQuantity(id, quantity);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item: CartItem) => (
                        <li key={item.id}>
                            <div>
                                <h3>{item.product.name}</h3>
                                <p>Price: ${item.product.price}</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    min="1"
                                />
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;