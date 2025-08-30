import React from 'react';
import useCart from '../hooks/useCart';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
    const { cartItems } = useCart();

    // Hitung total amount dari cartItems
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="responsive-container cart-page" style={{ maxWidth: 500, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', margin: '2rem auto' }}>
            <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: 24 }}>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            ) : (
                <>
                    <Cart />
                    <h2 style={{ textAlign: 'right', marginTop: 24 }}>Total Amount: ${totalAmount.toFixed(2)}</h2>
                    <form style={{ marginTop: 24 }}>
                        <h3>Checkout</h3>
                        <input type="text" placeholder="Name" required style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #eee' }} />
                        <input type="email" placeholder="Email" required style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #eee' }} />
                        <button type="submit" style={{ width: '100%', background: '#FF7043', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Checkout</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CartPage;