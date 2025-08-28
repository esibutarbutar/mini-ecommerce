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
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Cart />
                    <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                    <form>
                        <h3>Checkout</h3>
                        <input type="text" placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                        <button type="submit">Checkout</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CartPage;